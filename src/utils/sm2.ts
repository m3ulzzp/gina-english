import type { CardState } from "../data/words";

/**
 * SM-2 Spaced Repetition Algorithm
 * Reference: https://en.wikipedia.org/wiki/Spaced_repetition#SM-2
 */

export interface SM2Result {
  interval: number;    // days until next review
  easeFactor: number;  // new ease factor
  reviews: number;     // total reviews count
}

export function sm2Review(card: CardState, quality: 0 | 1 | 2 | 3): SM2Result {
  let { easeFactor, interval, reviews } = card;

  if (quality < 3) {
    // Wrong answer - reset
    interval = 1;
    reviews += 1;
    return { interval, easeFactor, reviews };
  }

  if (interval === 0) {
    interval = 1;
  } else if (interval === 1) {
    interval = 6;
  } else {
    interval = Math.round(interval * easeFactor);
  }

  // Adjust ease factor
  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (easeFactor < 1.3) easeFactor = 1.3;

  reviews += 1;

  return { interval, easeFactor, reviews };
}

export function getDueWords(cards: Record<string, CardState>, now: Date = new Date()): CardState[] {
  const due: CardState[] = [];
  const nowMs = now.getTime();

  for (const word of Object.values(cards)) {
    const lastReview = new Date(word.lastReview).getTime();
    const nextReview = lastReview + word.interval * 24 * 60 * 60 * 1000;
    if (nowMs >= nextReview) {
      due.push(word);
    }
  }

  return due;
}

export function getReviewPriority(cards: Record<string, CardState>): CardState[] {
  const now = new Date();
  const due = getDueWords(cards, now);

  return due.sort((a, b) => {
    // Sort by: due date ascending, then by ease factor ascending (harder words first)
    const aNext = new Date(a.lastReview).getTime() + a.interval * 86400000;
    const bNext = new Date(b.lastReview).getTime() + b.interval * 86400000;
    return aNext - bNext;
  });
}
