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

// 从构建时注入的 WORD_DATA 加载（包含配图）
export const defaultWords: Word[] = typeof WORD_DATA !== 'undefined' ? WORD_DATA : [];

export function getWordsByGrade(grade: Grade): Word[] {
  return defaultWords.filter((w) => w.grade === grade);
}

export function getAllWords(): Word[] {
  return defaultWords;
}
