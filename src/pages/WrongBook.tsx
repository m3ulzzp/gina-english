import { useStore } from "../store/useStore";
import { sm2Review } from "../utils/sm2";
import { speak } from "../utils/speech";
import { Link } from "react-router-dom";

export function WrongBook() {
  const { wrongBook, removeFromWrongBook, updateWrongBookEntry, incrementTodayCorrect, incrementTodayTotal } = useStore();
  const wrongWords = Object.values(wrongBook);

  const handleReview = (wordStr: string) => {
    const card = wrongBook[wordStr];
    if (!card) return;
    // Mark as mastered: remove from wrong book first
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-pink-50">
        <div className="text-center">
          <div className="text-7xl mb-4 animate-float">🎉</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">错词本是空的！</h2>
          <p className="text-gray-500 mb-6">太棒了，继续保持！</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-pink-50 to-purple-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-orange-500 to-red-400 bg-clip-text text-transparent mb-2">
            📕 错词本
          </h1>
          <p className="text-gray-500">共 {wrongWords.length} 个错词 · 复习它们就能进步！</p>
        </div>

        {/* Wrong words list */}
        <div className="space-y-4">
          {wrongWords.map((card) => (
            <div
              key={card.word.id}
              className="bg-white rounded-2xl shadow-md border-2 border-orange-100 p-5 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-gray-800">{card.word.word}</h3>
                    <span className="text-sm text-gray-400 font-mono">{card.word.phonetic}</span>
                  </div>
                  <p className="text-gray-600 mb-1">{card.word.meaning}</p>
                  <p className="text-sm text-gray-400 italic">"{card.word.example}"</p>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <button
                    onClick={() => speak(card.word.word)}
                    className="w-10 h-10 rounded-full bg-purple-100 hover:bg-purple-200 flex items-center justify-center transition-colors"
                    aria-label="听发音"
                  >
                    🔊
                  </button>
                  <button
                    onClick={() => handleReview(card.word.word)}
                    className="w-10 h-10 rounded-full bg-green-100 hover:bg-green-200 flex items-center justify-center transition-colors"
                    aria-label="标记已掌握"
                  >
                    ✅
                  </button>
                  <button
                    onClick={() => handleRemove(card.word.word)}
                    className="w-10 h-10 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors"
                    aria-label="移除"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {/* SM-2 stats */}
              <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
                <span>📊 复习 {card.reviews} 次</span>
                <span>📅 下次：{card.interval === 0 ? "新词" : `${card.interval} 天后`}</span>
                <span>⚡ 难度系数：{card.easeFactor.toFixed(1)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom action */}
        <div className="text-center mt-8">
          <Link
            to="/wordcard"
            className="px-8 py-3 inline-block rounded-full bg-gradient-to-r from-orange-400 to-red-400 text-white font-bold hover:shadow-lg transition-all"
          >
            🔄 开始复习错词
          </Link>
        </div>
      </div>
    </div>
  );
}
