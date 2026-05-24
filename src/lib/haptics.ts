// Lightweight haptic feedback. No-ops on devices without the Vibration API.
// Keep durations very short — premium apps use whisper-light feedback.
const canVibrate = () =>
  typeof navigator !== "undefined" && typeof navigator.vibrate === "function";

export const haptic = {
  light: () => { if (canVibrate()) navigator.vibrate(8); },
  medium: () => { if (canVibrate()) navigator.vibrate(14); },
  success: () => { if (canVibrate()) navigator.vibrate([8, 30, 12]); },
  selection: () => { if (canVibrate()) navigator.vibrate(5); },
};