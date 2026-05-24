---
name: Audio-first reels design
description: Home/Local news reels are audio-first — tap anywhere to play TTS, no mini player, big Listen CTA, center glassy overlay controls, progress bar, auto-advance to next article on audio end
type: design
---
Home and Local news ReelsView is an audio-first, Spotify+Reels-inspired experience.
- Tap anywhere on the card → toggle TTS play/pause (no navigation, no mini-player).
- Big "Listen · N min" CTA with teal→cyan gradient + glow below the summary.
- Center overlay: glassy Play/Pause + speed pill (1x → 1.25x → 1.5x → 1.75x), auto-hides after 2s, reappears on tap.
- Thin gradient progress bar pinned to bottom of card.
- On audio end → auto-advance to next article (400ms delay). On swipe → audio stops; user taps to play next.
- Side actions reduced to ONLY Bookmark + Share. Old speaker icon removed (whole card is the play surface).
- India/World toggle lives ONLY in Home header — ReelsView never renders its own duplicate toggle.
- Background: bottom-heavy dark gradient from-black/30 via-black/40 to-black/95.
- Headline 22–26px extrabold, 3-line clamp. Summary 13.5px, 2-line clamp. "Read full article" = small outline pill.
- Audio uses the `regional-tts` edge function (StreamElements + Google Translate TTS) — free, no user API key.
