import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Google Translate TTS — natural voice for native Indian languages
const GOOGLE_TTS_LANGS: Record<string, string> = {
  'hi': 'hi', 'te': 'te', 'ta': 'ta', 'kn': 'kn',
  'ml': 'ml', 'mr': 'mr', 'bn': 'bn', 'gu': 'gu', 'pa': 'pa',
};

// StreamElements (Polly) — professional news-reader voices for English
// "Brian" = British male newsreader, "Matthew" = American male newsreader
const STREAMELEMENTS_VOICES: Record<string, string> = {
  'en': 'Brian',     // British news-reader male (very natural)
  'en-us': 'Matthew',
  'en-in': 'Aditi',  // Indian English female
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, language = 'en', voice } = await req.json();
    if (!text || typeof text !== 'string') {
      return new Response(JSON.stringify({ error: 'Text is required' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const lang = String(language).toLowerCase();

    // ROUTE 1: English → StreamElements (Polly Brian — natural news-reader voice)
    if (lang === 'en' || lang.startsWith('en-')) {
      const seVoice = voice || STREAMELEMENTS_VOICES[lang] || 'Brian';
      // StreamElements has ~500-char limit per request; chunk and concat
      const chunks = splitText(text, 500);
      const buffers: ArrayBuffer[] = [];
      for (const chunk of chunks) {
        const url = `https://api.streamelements.com/kappa/v2/speech?voice=${encodeURIComponent(seVoice)}&text=${encodeURIComponent(chunk)}`;
        try {
          const resp = await fetch(url, {
            headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'audio/mpeg' },
          });
          if (resp.ok) {
            buffers.push(await resp.arrayBuffer());
          } else {
            console.warn(`StreamElements failed for chunk: ${resp.status}`);
          }
        } catch (e) {
          console.warn('StreamElements chunk error', e);
        }
      }
      if (buffers.length > 0) {
        return new Response(concatBuffers(buffers), {
          headers: { ...corsHeaders, 'Content-Type': 'audio/mpeg', 'Cache-Control': 'public, max-age=3600' },
        });
      }
      // Fall through to Google TTS as backup for English
    }

    // ROUTE 2: Indian language (or English fallback) → Google Translate TTS
    const gLang = GOOGLE_TTS_LANGS[lang] || (lang === 'en' ? 'en' : 'hi');
    const chunks = splitText(text, 200);
    const audioBuffers: ArrayBuffer[] = [];

    for (const chunk of chunks) {
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${gLang}&client=tw-ob&q=${encodeURIComponent(chunk)}`;
      try {
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Referer': 'https://translate.google.com/',
          },
        });
        if (!response.ok) {
          console.error(`Google TTS error for chunk: ${response.status}`);
          continue;
        }
        audioBuffers.push(await response.arrayBuffer());
      } catch (e) {
        console.error('Google TTS chunk fetch error', e);
      }
    }

    if (audioBuffers.length === 0) {
      return new Response(JSON.stringify({ error: 'TTS generation failed' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(concatBuffers(audioBuffers), {
      headers: { ...corsHeaders, 'Content-Type': 'audio/mpeg', 'Cache-Control': 'public, max-age=3600' },
    });
  } catch (error) {
    console.error('Regional TTS error:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function concatBuffers(buffers: ArrayBuffer[]): ArrayBuffer {
  const total = buffers.reduce((s, b) => s + b.byteLength, 0);
  const out = new Uint8Array(total);
  let off = 0;
  for (const b of buffers) { out.set(new Uint8Array(b), off); off += b.byteLength; }
  return out.buffer;
}

function splitText(text: string, maxLen: number): string[] {
  if (text.length <= maxLen) return [text];
  const chunks: string[] = [];
  let remaining = text;
  const sentenceBreaks = /([।.!?\n])\s*/g;

  while (remaining.length > 0) {
    if (remaining.length <= maxLen) {
      chunks.push(remaining.trim());
      break;
    }
    const segment = remaining.substring(0, maxLen);
    let lastBreak = -1;
    sentenceBreaks.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = sentenceBreaks.exec(segment)) !== null) {
      lastBreak = match.index + match[0].length;
    }
    if (lastBreak > 20) {
      chunks.push(remaining.substring(0, lastBreak).trim());
      remaining = remaining.substring(lastBreak);
    } else {
      const lastSpace = segment.lastIndexOf(' ');
      if (lastSpace > 20) {
        chunks.push(remaining.substring(0, lastSpace).trim());
        remaining = remaining.substring(lastSpace + 1);
      } else {
        chunks.push(segment.trim());
        remaining = remaining.substring(maxLen);
      }
    }
  }
  return chunks.filter(c => c.length > 0);
}
