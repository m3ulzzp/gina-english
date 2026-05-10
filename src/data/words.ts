export type Grade = "grade1" | "grade2" | "grade3" | "grade4" | "grade5" | "grade6";

export interface Word {
  id: string;
  word: string;
  phonetic: string;
  meaning: string;
  grade: Grade;
  example: string;
  type: "noun" | "verb" | "adjective" | "adverb" | "preposition" | "conjunction" | "pronoun";
  image?: string;  // Pexels image URL
}

export interface CardState {
  word: Word;
  lastReview: string;
  interval: number;       // days until next review
  easeFactor: number;     // SM-2 ease factor
  reviews: number;        // total reviews
}

export const GRADE_CONFIG: Record<Grade, { label: string; emoji: string; color: string; description: string }> = {
  grade1: { label: "一年级", emoji: "🌱", color: "#4ECB71", description: "基础词汇，从 ABC 开始" },
  grade2: { label: "二年级", emoji: "🌿", color: "#4D96FF", description: "简单句子和日常用语" },
  grade3: { label: "三年级", emoji: "🌳", color: "#FF9F43", description: "扩展词汇和阅读" },
  grade4: { label: "四年级", emoji: "🌻", color: "#FF6B6B", description: "进阶语法和写作" },
  grade5: { label: "五年级", emoji: "🌺", color: "#A66CFF", description: "复杂表达和听力" },
  grade6: { label: "六年级", emoji: "🏆", color: "#FFD93D", description: "小升初冲刺准备" },
};

export const defaultWords: Word[] = [
  { id: "g1-001", word: "apple", phonetic: "/ˈæp.əl/", meaning: "苹果", grade: "grade1", example: "I eat an apple every day.", type: "noun" },
  { id: "g1-002", word: "book", phonetic: "/bʊk/", meaning: "书", grade: "grade1", example: "This is my favorite book.", type: "noun" },
  { id: "g1-003", word: "cat", phonetic: "/kæt/", meaning: "猫", grade: "grade1", example: "The cat is sleeping.", type: "noun" },
  { id: "g1-004", word: "dog", phonetic: "/dɒɡ/", meaning: "狗", grade: "grade1", example: "My dog likes to run.", type: "noun" },
  { id: "g1-005", word: "egg", phonetic: "/eɡ/", meaning: "鸡蛋", grade: "grade1", example: "I had an egg for breakfast.", type: "noun" },
  { id: "g1-006", word: "fish", phonetic: "/fɪʃ/", meaning: "鱼", grade: "grade1", example: "The fish swims in the water.", type: "noun" },
  { id: "g1-007", word: "green", phonetic: "/ɡriːn/", meaning: "绿色", grade: "grade1", example: "The grass is green.", type: "adjective" },
  { id: "g1-008", word: "happy", phonetic: "/ˈhæp.i/", meaning: "开心的", grade: "grade1", example: "I am very happy today.", type: "adjective" },
  { id: "g1-009", word: "ice", phonetic: "/aɪs/", meaning: "冰", grade: "grade1", example: "The ice is cold.", type: "noun" },
  { id: "g1-010", word: "jump", phonetic: "/dʒʌmp/", meaning: "跳", grade: "grade1", example: "The frog can jump high.", type: "verb" },
  { id: "g2-001", word: "beautiful", phonetic: "/ˈbjuː.tɪ.fəl/", meaning: "美丽的", grade: "grade2", example: "The flower is beautiful.", type: "adjective" },
  { id: "g2-002", word: "computer", phonetic: "/kəmˈpjuː.tər/", meaning: "电脑", grade: "grade2", example: "I use the computer to study.", type: "noun" },
  { id: "g2-003", word: "delicious", phonetic: "/dɪˈlɪʃ.əs/", meaning: "美味的", grade: "grade2", example: "The cake is delicious.", type: "adjective" },
  { id: "g2-004", word: "elephant", phonetic: "/ˈel.ɪ.fənt/", meaning: "大象", grade: "grade2", example: "The elephant is very big.", type: "noun" },
  { id: "g2-005", word: "favorite", phonetic: "/ˈfeɪ.vər.ɪt/", meaning: "最喜欢的", grade: "grade2", example: "Blue is my favorite color.", type: "adjective" },
  { id: "g3-001", word: "adventure", phonetic: "/ədˈven.tʃər/", meaning: "冒险", grade: "grade3", example: "We had a great adventure.", type: "noun" },
  { id: "g3-002", word: "brilliant", phonetic: "/ˈbrɪl.jənt/", meaning: "杰出的", grade: "grade3", example: "She is a brilliant student.", type: "adjective" },
  { id: "g3-003", word: "celebrate", phonetic: "/ˈsel.ə.breɪt/", meaning: "庆祝", grade: "grade3", example: "We celebrate Christmas together.", type: "verb" },
  { id: "g3-004", word: "discovery", phonetic: "/dɪˈskʌv.ər.i/", meaning: "发现", grade: "grade3", example: "This was an important discovery.", type: "noun" },
  { id: "g3-005", word: "environment", phonetic: "/ɪnˈvaɪ.rən.mənt/", meaning: "环境", grade: "grade3", example: "We should protect the environment.", type: "noun" },
];

export function getWordsByGrade(grade: Grade): Word[] {
  return defaultWords.filter((w) => w.grade === grade);
}

export function getAllWords(): Word[] {
  return defaultWords;
}
