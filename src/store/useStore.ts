import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Grade, Word, CardState } from "../data/words";
import { defaultWords } from "../data/words";

interface AppState {
  grade: Grade;
  setGrade: (grade: Grade) => void;

  // Current word progress
  currentIndex: number;
  setCurrentIndex: (i: number) => void;

  // Card flip state
  isFlipped: boolean;
  setIsFlipped: (f: boolean) => void;

  // Wrong book
  wrongBook: Record<string, CardState>;
  addToWrongBook: (word: Word) => void;
  removeFromWrongBook: (word: string) => void;
  updateWrongBookEntry: (wordStr: string, updates: Partial<CardState>) => void;
  isInWrongBook: (word: string) => boolean;

  // Stats
  todayLearned: number;
  todayCorrect: number;
  todayTotal: number;
  incrementTodayLearned: () => void;
  incrementTodayCorrect: () => void;
  incrementTodayTotal: () => void;
  resetTodayStats: () => void;

  // Streak
  streak: number;
  lastStudyDate: string;
  incrementStreak: () => void;

  // Difficulty
  difficulty: "easy" | "normal" | "hard";
  setDifficulty: (d: "easy" | "normal" | "hard") => void;

  // Study mode
  studyMode: "learn" | "review" | "test";
  setStudyMode: (m: "learn" | "review" | "test") => void;
}

const todayKey = () => new Date().toISOString().slice(0, 10);

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      grade: "grade1",
      setGrade: (grade) => set({ grade }),

      currentIndex: 0,
      setCurrentIndex: (currentIndex) => set({ currentIndex }),

      isFlipped: false,
      setIsFlipped: (isFlipped) => set({ isFlipped }),

      wrongBook: {},
      addToWrongBook: (word) =>
        set((state) => ({
          wrongBook: { ...state.wrongBook, [word.word]: { word, lastReview: new Date().toISOString(), interval: 0, easeFactor: 2.5, reviews: 0 } },
        })),
      removeFromWrongBook: (wordStr) =>
        set((state) => {
          const copy = { ...state.wrongBook };
          delete copy[wordStr];
          return { wrongBook: copy };
        }),
      updateWrongBookEntry: (wordStr, updates) =>
        set((state) => ({
          wrongBook: { ...state.wrongBook, [wordStr]: { ...state.wrongBook[wordStr], ...updates } },
        })),
      isInWrongBook: (wordStr) => !!get().wrongBook[wordStr],

      todayLearned: 0,
      todayCorrect: 0,
      todayTotal: 0,
      incrementTodayLearned: () => set((s) => ({ todayLearned: s.todayLearned + 1 })),
      incrementTodayCorrect: () => set((s) => ({ todayCorrect: s.todayCorrect + 1 })),
      incrementTodayTotal: () => set((s) => ({ todayTotal: s.todayTotal + 1 })),
      resetTodayStats: () => set({ todayLearned: 0, todayCorrect: 0, todayTotal: 0 }),

      streak: 0,
      lastStudyDate: "",
      incrementStreak: () => {
        const today = todayKey();
        const last = get().lastStudyDate;
        if (last === today) return set({ streak: get().streak });
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayKey = yesterday.toISOString().slice(0, 10);
        const newStreak = last === yesterdayKey ? get().streak + 1 : 1;
        set({ streak: newStreak, lastStudyDate: today });
      },

      difficulty: "normal",
      setDifficulty: (difficulty) => set({ difficulty }),

      studyMode: "learn",
      setStudyMode: (studyMode) => set({ studyMode }),
    }),
    { name: "gina-english-store" }
  )
);

export { defaultWords };
