import { useStore } from "../store/useStore";
import { speak } from "../utils/speech";
import { Link } from "react-router-dom";

export function WrongBook() {
  const { wrongBook, removeFromWrongBook, incrementTodayCorrect, incrementTodayTotal } = useStore();
  const wrongWords = Object.values(wrongBook);

  const handleReview = (wordStr: string) => {
    const card = wrongBook[wordStr];
    if (!card) return;
    removeFromWrongBook(wordStr);
    incrementTodayCorrect();
    incrementTodayTotal();
    speak(card.word.word);
  };

  const handleRemove = (wordStr: string) => {
    removeFromWrongBook(wordStr);
  };

  if (wrongWords.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-pink-50 relative overflow-hidden">
        <div className="floating-deco top-20 left-12 text-5xl" style={{ animationDelay: "0s" }}>🎉</div>
        <div className="floating-deco bottom-20 right-12 text-4xl" style={{ animationDelay: "1s" }}>⭐</div>
        <div className="floating-deco top-40 right-24 text-3xl" style={{ animationDelay: "2s" }}>🌟</div>
        <div className="text-center relative z-10">
          <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center shadow-xl shadow-green-200/40 animate-gentle-bounce">
            <span className="text-5xl">🎉</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-700 mb-2">错词本是空的！</h2>
          <p className="text-gray-400 text-lg">太棒了，继续保持！🌟</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-pink-50 to-purple-50 py-6 sm:py-8 px-3 sm:px-4 relative overflow-hidden">
      {/* Floating background decorations */}
      <div className="floating-deco top-16 left-8 text-5xl" style={{ animationDelay: "0s" }}>📕</div>
      <div className="floating-deco bottom-32 right-12 text-4xl" style={{ animationDelay: "1.5s" }}>📖</div>

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center shadow-lg shadow-orange-200/40 animate-gentle-bounce">
            <span className="text-3xl">📕</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-orange-500 to-red-400 gradient-text mb-2">
            错词本
          </h1>
          <p className="text-gray-400 text-sm">共 {wrongWords.length} 个错词 · 复习它们就能进步！💪</p>
        </div>

        {/* Wrong words list */}
        <div className="space-y-3 sm:space-y-4">
          {wrongWords.map((card) => (
            <div
              key={card.word.id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-50/50 hover:shadow-xl transition-all overflow-hidden"
            >
              {/* Top accent bar */}
              <div className="h-1.5 bg-gradient-to-r from-orange-300 to-red-300" />

              <div className="p-4 sm:p-5">
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* Word info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 sm:gap-3 mb-1.5 flex-wrap">
                      <h3 className="text-xl sm:text-2xl font-black text-gray-800">{card.word.word}</h3>
                      <span className="text-xs text-gray-300 font-mono bg-gray-50 px-2 py-0.5 rounded-full">{card.word.phonetic}</span>
                    </div>
                    <p className="text-gray-600 mb-1 text-sm sm:text-base font-medium">{card.word.meaning}</p>
                    <p className="text-xs text-gray-300 italic truncate">"{card.word.example}"</p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button
                      onClick={() => speak(card.word.word)}
                      className="w-10 h-10 rounded-xl bg-purple-50 hover:bg-purple-100 flex items-center justify-center transition-all active:scale-90 tap-target"
                      aria-label="听发音"
                    >
                      <span className="text-base">🔊</span>
                    </button>
                    <button
                      onClick={() => handleReview(card.word.word)}
                      className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-emerald-400 text-white hover:shadow-lg hover:scale-105 active:scale-90 flex items-center justify-center transition-all tap-target"
                      aria-label="标记已掌握"
                    >
                      <span className="text-base">✅</span>
                    </button>
                    <button
                      onClick={() => handleRemove(card.word.word)}
                      className="w-10 h-10 rounded-xl bg-red-50 hover:bg-red-100 flex items-center justify-center transition-all active:scale-90 tap-target"
                      aria-label="移除"
                    >
                      <span className="text-base">🗑️</span>
                    </button>
                  </div>
                </div>

                {/* SM-2 stats */}
                <div className="mt-3 flex items-center gap-3 sm:gap-4 text-xs text-gray-300 px-1">
                  <span>📊 复习 {card.reviews} 次</span>
                  <span>📅 {card.interval === 0 ? "新词" : `${card.interval} 天后`}</span>
                  <span>⚡ {card.easeFactor.toFixed(1)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom action */}
        <div className="text-center mt-8">
          <Link
            to="/wordcard"
            className="px-8 py-4 inline-block rounded-2xl bg-gradient-to-r from-orange-400 to-red-400 text-white font-black text-lg hover:shadow-xl hover:shadow-orange-200/40 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg tap-target"
          >
            🔄 开始复习错词
          </Link>
        </div>
      </div>
    </div>
  );
}
