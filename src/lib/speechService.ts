import { cleanTextForTTS, fetchTTSBlob } from '@/lib/ttsCache';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

type SpeakCallbacks = {
  onStart?: () => void;
  onEnd?: () => void;
  onPauseChange?: (paused: boolean) => void;
  onProgress?: (progress: number) => void;
  onFallback?: (language: string) => void;
  onError?: () => void;
};

type SpeakRequest = {
  text: string;
  language: string;
  rate: number;
} & SpeakCallbacks;

type SpeakResult = {
  started: boolean;
  fallbackUsed: boolean;
  language: string;
  durationMs: number;
};

type ActiveSpeech = {
  text: string;
  originalText: string;
  language: string;
  rate: number;
  callbacks: SpeakCallbacks;
  fallbackUsed: boolean;
  charIndex: number;
  started: boolean;
  paused: boolean;
  durationMs: number;
};

type ActiveAudio = {
  audio: HTMLAudioElement;
  language: string;
  fallbackUsed: boolean;
  callbacks: SpeakCallbacks;
  rafId: number | null;
  paused: boolean;
  text: string;
  rate: number;
};

const LANGUAGE_LOCALES: Record<string, string[]> = {
  en: ['en-IN', 'en-GB', 'en-US', 'en'],
  hi: ['hi-IN', 'hi'],
  te: ['te-IN', 'te'],
  ta: ['ta-IN', 'ta'],
  kn: ['kn-IN', 'kn'],
  ml: ['ml-IN', 'ml'],
  mr: ['mr-IN', 'mr'],
  bn: ['bn-IN', 'bn'],
  gu: ['gu-IN', 'gu'],
};

const LANGUAGE_SCRIPTS: Partial<Record<string, RegExp>> = {
  hi: /[\u0900-\u097F]/g,
  te: /[\u0C00-\u0C7F]/g,
  ta: /[\u0B80-\u0BFF]/g,
  kn: /[\u0C80-\u0CFF]/g,
  ml: /[\u0D00-\u0D7F]/g,
  mr: /[\u0900-\u097F]/g,
  bn: /[\u0980-\u09FF]/g,
  gu: /[\u0A80-\u0AFF]/g,
};

const LANGUAGE_CHAR_RANGES: Partial<Record<string, string>> = {
  hi: '\\u0900-\\u097F',
  te: '\\u0C00-\\u0C7F',
  ta: '\\u0B80-\\u0BFF',
  kn: '\\u0C80-\\u0CFF',
  ml: '\\u0D00-\\u0D7F',
  mr: '\\u0900-\\u097F',
  bn: '\\u0980-\\u09FF',
  gu: '\\u0A80-\\u0AFF',
};

function normalizeLanguageCode(language: string) {
  const normalized = (language || 'en').toLowerCase();
  if (normalized.startsWith('en')) return 'en';
  if (normalized.startsWith('hi')) return 'hi';
  if (normalized.startsWith('te')) return 'te';
  if (normalized.startsWith('ta')) return 'ta';
  if (normalized.startsWith('kn')) return 'kn';
  if (normalized.startsWith('ml')) return 'ml';
  if (normalized.startsWith('mr')) return 'mr';
  if (normalized.startsWith('bn')) return 'bn';
  if (normalized.startsWith('gu')) return 'gu';
  return 'en';
}

function stripDuplicateWords(text: string) {
  return text.replace(/(\b[\p{L}\p{N}]+\b)(\s+\1\b)+/giu, '$1');
}

function finalizeText(text: string) {
  return stripDuplicateWords(text)
    .replace(/(?:\.\s*){2,}/g, '. ')
    .replace(/…+/g, ' … ')
    .replace(/\s*,\s*/g, ', ')
    .replace(/\s*([.!?।])\s*/g, '$1 … ')
    .replace(/\s+/g, ' ')
    .trim();
}

function scriptMatchesLanguage(text: string, language: string) {
  const script = LANGUAGE_SCRIPTS[language];
  if (!script || language === 'en') return true;
  const body = text.replace(/[\s\d.,!?;:'"()\-]/g, '');
  if (body.length < 12) return true;
  const matches = body.match(script) || [];
  return matches.length / Math.max(body.length, 1) > 0.18;
}

function estimateDurationMs(text: string, rate: number) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const wordsPerMinute = 155 * Math.max(rate, 0.8);
  return Math.max(2500, Math.round((words / wordsPerMinute) * 60_000));
}

function filterToLanguageScript(text: string, language: string) {
  if (language === 'en') return finalizeText(cleanTextForTTS(text));
  const range = LANGUAGE_CHAR_RANGES[language];
  if (!range) return finalizeText(cleanTextForTTS(text));

  const source = finalizeText(cleanTextForTTS(text))
    .replace(/\s+[|•·]+\s+/g, '. ')
    .replace(/\s+-\s+/g, '. ');
  const allowedChar = new RegExp(`^[${range}\\p{M}\\s\\d.,!?;:'"()\\-–—।]$`, 'u');

  const filtered = Array.from(source)
    .map((char) => (allowedChar.test(char) ? char : ' '))
    .join('')
    .replace(/\s*([.!?।])\s*/g, '$1 … ')
    .replace(/\s+/g, ' ')
    .trim();

  return finalizeText(filtered);
}

function scoreSpeechCandidate(text: string, language: string) {
  const cleaned = finalizeText(cleanTextForTTS(text));
  if (!cleaned) return -1;
  if (language === 'en') return cleaned.length;

  const filtered = filterToLanguageScript(cleaned, language);
  const visible = cleaned.replace(/[\s\d.,!?;:'"()\-–—।]/g, '');
  const filteredVisible = filtered.replace(/[\s\d.,!?;:'"()\-–—।]/g, '');
  const coverage = filteredVisible.length / Math.max(visible.length, 1);
  const latinWordPenalty = (cleaned.match(/[A-Za-z]{3,}/g) || []).length * 8;
  const feedNoisePenalty = (cleaned.match(/[|]/g) || []).length * 12;

  return filtered.length + coverage * 80 - latinWordPenalty - feedNoisePenalty;
}

export function getPreferredSpeechText(article: {
  title?: string;
  description?: string;
  language?: string;
}) {
  const language = normalizeLanguageCode(article.language || 'en');
  const title = article.title || '';
  const description = article.description || '';
  const combined = [title, description].filter(Boolean).join('. ');
  const filteredTitle = language === 'en' ? finalizeText(cleanTextForTTS(title)) : filterToLanguageScript(title, language);

  if (language !== 'en' && filteredTitle.length >= 12 && scriptMatchesLanguage(filteredTitle, language)) {
    return filteredTitle;
  }

  const candidates = language === 'en'
    ? [description, combined, title]
    : [title, description, combined];

  let best = candidates[0] || '';
  let bestScore = -1;

  for (const candidate of candidates) {
    const score = scoreSpeechCandidate(candidate, language);
    if (score > bestScore) {
      bestScore = score;
      best = candidate;
    }
  }

  if (language === 'en') {
    return finalizeText(cleanTextForTTS(best));
  }

  const filtered = filterToLanguageScript(best, language);
  if (filtered.length >= 12) return filtered;

  return finalizeText(cleanTextForTTS(best));
}

class SpeechService {
  private synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private voices: SpeechSynthesisVoice[] = [];
  private active: ActiveSpeech | null = null;
  private utterance: SpeechSynthesisUtterance | null = null;
  private token = 0;
  private audioActive: ActiveAudio | null = null;
  private heartbeat: ReturnType<typeof setInterval> | null = null;

  // Chromium/WebKit pause SpeechSynthesis after ~15s of continuous speech.
  // Tapping pause()→resume() on a short interval keeps the queue alive so
  // long Indian-language articles don't freeze after the first sentence.
  private startHeartbeat() {
    if (this.heartbeat) return;
    this.heartbeat = setInterval(() => {
      if (!this.synth || !this.active) { this.stopHeartbeat(); return; }
      if (this.active.paused) return;
      try {
        if (this.synth.speaking && !this.synth.paused) {
          this.synth.pause();
          this.synth.resume();
        }
      } catch { /* noop */ }
    }, 9000);
  }

  private stopHeartbeat() {
    if (this.heartbeat) {
      clearInterval(this.heartbeat);
      this.heartbeat = null;
    }
  }

  constructor() {
    if (typeof window !== 'undefined' && this.synth) {
      this.refreshVoices();
      window.speechSynthesis.onvoiceschanged = () => this.refreshVoices();
    }
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) this.stop();
      });
      window.addEventListener('pagehide', () => this.stop());
      window.addEventListener('blur', () => {
        // Only stop on true window blur, not on focus shifts within the page.
        if (document.hidden) this.stop();
      });
    }
  }

  private refreshVoices() {
    if (!this.synth) return;
    const nextVoices = this.synth.getVoices();
    if (nextVoices.length > 0) this.voices = nextVoices;
  }

  private preferredLocale(language: string) {
    return LANGUAGE_LOCALES[language]?.[0] || 'en-IN';
  }

  private pickVoice(language: string) {
    this.refreshVoices();
    const localePreferences = LANGUAGE_LOCALES[language] || LANGUAGE_LOCALES.en;
    const voicePool = this.voices.slice();
    if (!voicePool.length) return null;

    const ranked = voicePool
      .map((voice) => {
        const voiceLang = voice.lang.toLowerCase();
        let score = 0;
        localePreferences.forEach((locale, index) => {
          const loweredLocale = locale.toLowerCase();
          if (voiceLang === loweredLocale) score = Math.max(score, 100 - index * 10);
          else if (voiceLang.startsWith(loweredLocale.split('-')[0])) score = Math.max(score, 70 - index * 10);
        });
        if (language === 'en') {
          const name = voice.name.toLowerCase();
          if (name.includes('india')) score += 8;
          if (name.includes('female') || name.includes('samantha') || name.includes('aditi')) score += 4;
        }
        return { voice, score };
      })
      .sort((a, b) => b.score - a.score);

    return ranked[0]?.score > 0 ? ranked[0].voice : null;
  }

  private prepare(rawText: string, requestedLanguage: string) {
    const normalizedLanguage = normalizeLanguageCode(requestedLanguage);
    const cleanedText = getPreferredSpeechText({ description: rawText || '', language: normalizedLanguage });
    if (!cleanedText) {
      return { text: '', language: 'en', fallbackUsed: normalizedLanguage !== 'en' };
    }

    const consistentLanguage = scriptMatchesLanguage(cleanedText, normalizedLanguage) ? normalizedLanguage : 'en';
    const voice = this.pickVoice(consistentLanguage);
    const finalLanguage = voice ? consistentLanguage : 'en';

    return {
      text: cleanedText,
      language: finalLanguage,
      fallbackUsed: finalLanguage !== normalizedLanguage,
    };
  }

  hasActiveSpeech() {
    return !!this.active || !!this.audioActive;
  }

  isPaused() {
    return !!this.active?.paused || !!this.audioActive?.paused;
  }

  stop() {
    this.token += 1;
    this.active = null;
    this.utterance = null;
    this.stopHeartbeat();
    if (this.synth) {
      try { this.synth.cancel(); } catch { /* noop */ }
      // Some browsers (Chrome) need a second cancel after a microtask to
      // fully flush a stuck utterance — without this the next speak() can
      // freeze on the first sentence.
      try { this.synth.cancel(); } catch { /* noop */ }
    }
    if (this.audioActive) {
      const a = this.audioActive;
      this.audioActive = null;
      // Detach handlers FIRST so the pending pause/error events for the
      // previous reel can't fire on the new reel and clobber its state.
      try {
        a.audio.onplay = null;
        a.audio.onpause = null;
        a.audio.onended = null;
        a.audio.onerror = null;
      } catch { /* noop */ }
      try { a.audio.pause(); } catch { /* noop */ }
      try { a.audio.removeAttribute('src'); a.audio.load(); } catch { /* noop */ }
      if (a.rafId) cancelAnimationFrame(a.rafId);
    }
  }

  togglePause() {
    if (this.audioActive) {
      const a = this.audioActive;
      if (a.paused || a.audio.paused) {
        a.audio.play().catch(() => undefined);
        a.paused = false;
        a.callbacks.onPauseChange?.(false);
        return false;
      }
      a.audio.pause();
      a.paused = true;
      a.callbacks.onPauseChange?.(true);
      return true;
    }
    if (!this.synth || !this.active) return null;
    if (this.synth.paused || this.active.paused) {
      this.synth.resume();
      this.active.paused = false;
      this.active.callbacks.onPauseChange?.(false);
      return false;
    }
    if (this.synth.speaking) {
      this.synth.pause();
      this.active.paused = true;
      this.active.callbacks.onPauseChange?.(true);
      return true;
    }
    return null;
  }

  async speak(request: SpeakRequest): Promise<SpeakResult> {
    const normalizedLanguage = normalizeLanguageCode(request.language);
    const cleaned = getPreferredSpeechText({ description: request.text || '', language: normalizedLanguage });
    if (!cleaned) {
      return { started: false, fallbackUsed: false, language: normalizedLanguage, durationMs: 0 };
    }

    const consistentLanguage = scriptMatchesLanguage(cleaned, normalizedLanguage)
      ? normalizedLanguage
      : 'en';

    // Stop any current playback (browser TTS or audio)
    this.stop();
    const rate = Math.min(Math.max(request.rate, 0.8), 1.5);

    // ALWAYS use the regional-tts edge function for non-English. Browser
    // SpeechSynthesis voices for Indian languages are missing on most Android
    // and desktop Chrome installs, so we go straight to the MP3 path.
    if (consistentLanguage !== 'en') {
      const result = await this.speakViaAudio(cleaned, consistentLanguage, rate, request);
      if (result.started) return result;
      // Edge function failed — silently fall through to English browser voice.
      // We deliberately swallow the error and DO NOT call onError, so the UI
      // never shows an "Audio unavailable" snackbar for an Indian-language article.
    }

    // For pure English, also try the edge function FIRST. It produces a much
    // more natural news-reader voice (StreamElements / Polly Brian) than the
    // robotic browser default, and works on devices where SpeechSynthesis is
    // unavailable (in-app webviews, some Android browsers).
    if (consistentLanguage === 'en') {
      const result = await this.speakViaAudio(cleaned, 'en', rate, request);
      if (result.started) return result;
    }

    if (!this.synth || typeof SpeechSynthesisUtterance === 'undefined') {
      // No browser TTS available and edge function failed — give up silently
      // (do NOT trigger onError so no toast is shown).
      return { started: false, fallbackUsed: true, language: 'en', durationMs: 0 };
    }

    const prepared = this.prepare(request.text, request.language);
    if (!prepared.text) {
      return { started: false, fallbackUsed: prepared.fallbackUsed, language: prepared.language, durationMs: 0 };
    }

    // already stopped above
    const token = ++this.token;

    this.active = {
      text: prepared.text,
      originalText: prepared.text,
      language: prepared.language,
      rate: Math.min(Math.max(request.rate, 0.8), 1.5),
      callbacks: request,
      fallbackUsed: prepared.fallbackUsed,
      charIndex: 0,
      started: false,
      paused: false,
      durationMs: estimateDurationMs(prepared.text, Math.min(Math.max(request.rate, 0.8), 1.5)),
    };

    return new Promise<SpeakResult>((resolve) => {
      let resolved = false;
      const startFrom = 0;
      const active = this.active;
      if (!active) {
        resolve({ started: false, fallbackUsed: prepared.fallbackUsed, language: prepared.language, durationMs: 0 });
        return;
      }

      const utterance = new SpeechSynthesisUtterance(active.originalText.slice(startFrom));
      const voice = this.pickVoice(active.language);
      utterance.lang = voice?.lang || this.preferredLocale(active.language);
      utterance.rate = active.rate;
      if (voice) utterance.voice = voice;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onstart = () => {
        if (token !== this.token || !this.active) return;
        this.active.started = true;
        this.active.paused = false;
        this.startHeartbeat();
        this.active.callbacks.onStart?.();
        if (this.active.fallbackUsed) this.active.callbacks.onFallback?.(this.active.language);
        if (!resolved) {
          resolved = true;
          resolve({ started: true, fallbackUsed: this.active.fallbackUsed, language: this.active.language, durationMs: this.active.durationMs });
        }
      };

      utterance.onboundary = (event) => {
        if (token !== this.token || !this.active) return;
        if (typeof event.charIndex !== 'number') return;
        this.active.charIndex = event.charIndex;
        this.active.callbacks.onProgress?.(Math.max(0, Math.min(0.98, event.charIndex / Math.max(this.active.originalText.length, 1))));
      };

      utterance.onpause = () => {
        if (token !== this.token || !this.active) return;
        this.active.paused = true;
        this.active.callbacks.onPauseChange?.(true);
      };

      utterance.onresume = () => {
        if (token !== this.token || !this.active) return;
        this.active.paused = false;
        this.active.callbacks.onPauseChange?.(false);
      };

      utterance.onend = () => {
        if (token !== this.token || !this.active) return;
        const callbacks = this.active.callbacks;
        this.active = null;
        this.utterance = null;
        this.stopHeartbeat();
        callbacks.onProgress?.(1);
        callbacks.onEnd?.();
      };

      utterance.onerror = () => {
        if (token !== this.token || !this.active) return;
        const callbacks = this.active.callbacks;
        this.active = null;
        this.utterance = null;
        this.stopHeartbeat();
        if (!resolved) {
          resolved = true;
          resolve({ started: false, fallbackUsed: true, language: 'en', durationMs: 0 });
        }
        callbacks.onError?.();
      };

      this.utterance = utterance;
      this.synth.cancel();
      this.synth.speak(utterance);

      window.setTimeout(() => {
        if (!resolved) {
          resolved = true;
          resolve({
            started: this.synth?.speaking || this.synth?.pending || this.active?.started || false,
            fallbackUsed: this.active?.fallbackUsed || false,
            language: this.active?.language || prepared.language,
            durationMs: this.active?.durationMs || estimateDurationMs(prepared.text, active.rate),
          });
        }
      }, 250);
    });
  }

  private async speakViaAudio(
    cleanedText: string,
    language: string,
    rate: number,
    callbacks: SpeakCallbacks
  ): Promise<SpeakResult> {
    if (!SUPABASE_URL || !SUPABASE_KEY) {
      return { started: false, fallbackUsed: true, language: 'en', durationMs: 0 };
    }
    // Capture token at entry. If stop() (or another speak()) bumps the token
    // while we're awaiting the network fetch, this call is stale and must
    // NOT create or play an Audio element — otherwise the previous reel's
    // audio plays alongside the new one.
    const entryToken = this.token;
    const result = await fetchTTSBlob({
      text: cleanedText,
      language,
      speed: rate,
      supabaseUrl: SUPABASE_URL,
      apiKey: SUPABASE_KEY,
    });
    if (entryToken !== this.token) {
      return { started: false, fallbackUsed: false, language, durationMs: 0 };
    }
    if (!result?.url) {
      return { started: false, fallbackUsed: true, language: 'en', durationMs: 0 };
    }

    // Reuse the entry token — DO NOT increment again, or we'd invalidate
    // ourselves and any other in-flight handlers spuriously.
    const token = entryToken;
    const audio = new Audio(result.url);
    audio.preload = 'auto';
    audio.playbackRate = rate;

    const active: ActiveAudio = {
      audio,
      language,
      fallbackUsed: false,
      callbacks,
      rafId: null,
      paused: false,
      text: cleanedText,
      rate,
    };
    this.audioActive = active;

    const tick = () => {
      if (token !== this.token || this.audioActive !== active) return;
      const dur = audio.duration;
      if (dur && isFinite(dur) && dur > 0) {
        callbacks.onProgress?.(Math.min(0.99, audio.currentTime / dur));
      }
      active.rafId = requestAnimationFrame(tick);
    };

    return new Promise<SpeakResult>((resolve) => {
      let resolved = false;
      const finish = (started: boolean, durationMs: number) => {
        if (resolved) return;
        resolved = true;
        resolve({ started, fallbackUsed: false, language, durationMs });
      };

      audio.onplay = () => {
        if (token !== this.token) return;
        active.paused = false;
        callbacks.onStart?.();
        active.rafId = requestAnimationFrame(tick);
        const durMs = isFinite(audio.duration) ? audio.duration * 1000 : estimateDurationMs(cleanedText, rate);
        finish(true, Math.max(2000, Math.round(durMs)));
      };
      audio.onpause = () => {
        if (token !== this.token || this.audioActive !== active) return;
        if (!audio.ended) {
          active.paused = true;
          callbacks.onPauseChange?.(true);
        }
      };
      audio.onended = () => {
        if (token !== this.token || this.audioActive !== active) return;
        if (active.rafId) cancelAnimationFrame(active.rafId);
        this.audioActive = null;
        callbacks.onProgress?.(1);
        callbacks.onEnd?.();
      };
      audio.onerror = () => {
        if (token !== this.token || this.audioActive !== active) return;
        if (active.rafId) cancelAnimationFrame(active.rafId);
        this.audioActive = null;
        // Silent failure — caller (speak()) will fall back to browser TTS.
        finish(false, 0);
      };

      audio.play().catch(() => {
        if (this.audioActive === active) this.audioActive = null;
        // Silent failure — caller (speak()) will fall back to browser TTS.
        finish(false, 0);
      });
    });
  }

  async setRate(rate: number) {
    if (this.audioActive) {
      const clamped = Math.min(Math.max(rate, 0.8), 1.5);
      this.audioActive.rate = clamped;
      try { this.audioActive.audio.playbackRate = clamped; } catch { /* noop */ }
      return null;
    }
    if (!this.active) return null;
    const current = this.active;
    const remainingText = current.originalText.slice(Math.max(0, current.charIndex - 12)).trim() || current.originalText;
    const callbacks = current.callbacks;
    return this.speak({
      text: remainingText,
      language: current.language,
      rate,
      ...callbacks,
    });
  }
}

export const speechService = new SpeechService();
