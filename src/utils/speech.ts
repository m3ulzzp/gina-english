export function speak(text: string, lang: string = "en-US", rate: number = 0.85): boolean {
  if (!("speechSynthesis" in window)) {
    console.warn("Speech Synthesis not supported");
    return false;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = rate;
  utterance.pitch = 1.1;
  utterance.volume = 1;

  // Try to find a good English voice
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find((v) => v.lang.startsWith("en") && v.name.includes("Google"))
    || voices.find((v) => v.lang.startsWith("en"))
    || voices[0];
  if (preferred) utterance.voice = preferred;

  window.speechSynthesis.speak(utterance);
  return true;
}

export function speakChinese(text: string): boolean {
  return speak(text, "zh-CN", 0.75);
}

export function speakExample(example: string): boolean {
  return speak(example, "en-US", 0.8);
}

// Preload voices
if ("speechSynthesis" in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}
