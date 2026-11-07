/**
 * Utility for pronouncing Spanish text using the Web Speech API
 */
export function speakSpanish(text: string): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const cleanText = text
    .replace(/[«»"“”…]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleanText) return;

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = 'es-ES';
  utterance.rate = 0.9; // Slightly slower for language learners
  utterance.pitch = 1.0;

  // Try to find a Spanish voice if available
  const voices = window.speechSynthesis.getVoices();
  const spanishVoice = voices.find(
    (v) => v.lang.startsWith('es') || v.lang.includes('es-ES') || v.name.toLowerCase().includes('spanish')
  );
  if (spanishVoice) {
    utterance.voice = spanishVoice;
  }

  window.speechSynthesis.speak(utterance);
}
