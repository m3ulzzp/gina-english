import { useState, useEffect, useCallback } from "react";
import { useStore } from "../store/useStore";
import { getWordsByGrade, type Word } from "../data/words";
import { speak } from "../utils/speech";
import { WordCard as WordCardComponent } from "../components/WordCard";

export function WordCardPage() {
  const { grade, currentIndex, setCurrentIndex, isFlipped, setIsFlipped, wrongBook, addToWrongBook, removeFromWrongBook, incrementTodayCorrect, incrementTodayTotal } = useStore();

  const words = getWordsByGrade(grade);
  const [reviewWords, setReviewWords] = useState<Word[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  // Initialize review words from wrong book
  useEffect(() => {
    const wrongWordList: Word[] = [];
    for (const card of Object.values(wrongBook)) {
      wrongWordList.push(card.word);
    }
    setReviewWords(wrongWordList.length > 0 ? wrongWordList : words.slice(0, 5));
  }, [grade, wrongBook]);

  const currentWord = reviewWords[currentIndex % reviewWords.length];

  const handleKnow = useCallback(() => {
    if (!currentWord) return;
    incrementTodayCorrect();
    incrementTodayTotal();
    removeFromWrongBook(currentWord.word);
    speak(currentWord.word);

    // Show confetti effect
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);

    // Next word
    setCurrentIndex((currentIndex + 1) % Math.max(reviewWords.length, 1));
    setIsFlipped(false);
  }, [currentWord, currentIndex, reviewWords.length, incrementTodayCorrect, incrementTodayTotal, removeFromWrongBook, setCurrentIndex, setIsFlipped]);

  const handleDontKnow = useCallback(() => {
    if (!currentWord) return;
    incrementTodayTotal();
    addToWrongBook(currentWord);
    speak(currentWord.word);

    setCurrentIndex((currentIndex + 1) % Math.max(reviewWords.length, 1));
    setIsFlipped(false);
  }, [currentWord, currentIndex, reviewWords.length, addToWrongBook, setCurrentIndex, setIsFlipped, incrementTodayTotal]);

  const handleNext = useCallback(() => {
    setCurrentIndex((currentIndex + 1) % Math.max(reviewWords.length, 1));
    setIsFlipped(false);
  }, [currentIndex, reviewWords.length, setCurrentIndex, setIsFlipped]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((currentIndex - 1 + reviewWords.length) % reviewWords.length);
    setIsFlipped(false);
  }, [currentIndex, reviewWords.length, setCurrentIndex, setIsFlipped]);

  const handleFlip = useCallback(() => {
    setIsFlipped(!isFlipped);
  }, [isFlipped, setIsFlipped]);

  if (reviewWords.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-pink-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">太棒了！</h2>
          <p className="text-gray-500">当前年级还没有单词，请先添加词库数据。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-pink-50 to-purple-50 py-8 px-4 relative overflow-hidden">
      {/* Confetti effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 1}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                fontSize: `${16 + Math.random() * 16}px`,
              }}
            >
              {["🎉", "⭐", "✨", "🌟", "💫", "🎊"][Math.floor(Math.random() * 6)]}
            </div>
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <WordCardComponent
          word={currentWord}
          isFlipped={isFlipped}
          onFlip={handleFlip}
          onNext={handleNext}
          onPrev={handlePrev}
          onKnow={handleKnow}
          onDontKnow={handleDontKnow}
          progress={{ current: (currentIndex % reviewWords.length) + 1, total: reviewWords.length }}
        />

        {/* Bottom info */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-400">
            📚 当前年级：{grade === "grade1" ? "一年级" : grade === "grade2" ? "二年级" : grade === "grade3" ? "三年级" : grade === "grade4" ? "四年级" : grade === "grade5" ? "五年级" : "六年级"}
            {" · "}
            词库：{words.length} 词
            {" · "}
            错词本：{Object.keys(wrongBook).length} 词
          </p>
        </div>
      </div>
    </div>
  );
}
