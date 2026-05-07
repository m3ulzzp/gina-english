import { useState } from "react";
import { speak, speakExample } from "../utils/speech";
import type { Word } from "../data/words";

interface WordCardProps {
  word: Word;
  isFlipped: boolean;
  onFlip: () => void;
  onNext: () => void;
  onPrev: () => void;
  onKnow: () => void;
  onDontKnow: () => void;
  progress: { current: number; total: number };
}

const typeEmojis: Record<string, string> = {
  noun: "📦",
  verb: "🏃",
  adjective: "🎨",
  adverb: "💫",
  preposition: "📍",
  conjunction: "🔗",
  pronoun: "👤",
};

export function WordCard({ word, isFlipped, onFlip, onNext, onPrev, onKnow, onDontKnow, progress }: WordCardProps) {
  const [showExample, setShowExample] = useState(false);
  const emoji = typeEmojis[word.type] || "📝";

  const handleSpeak = () => speak(word.word);
  const handleSpeakExample = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakExample(word.example);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>进度</span>
          <span className="font-bold">
            {progress.current} / {progress.total}
          </span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-500"
            style={{ width: `${(progress.current / progress.total) * 100}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div
        className="relative cursor-pointer perspective-1000"
        onClick={onFlip}
        role="button"
        aria-label={isFlipped ? "点击收起释义" : "点击显示释义"}
      >
        <div
          className={`relative w-full transition-transform duration-500 ${
            isFlipped ? "" : ""
          }`}
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front */}
          <div
            className="w-full bg-white rounded-[2rem] shadow-xl border-2 border-purple-100 p-8 flex flex-col items-center justify-center min-h-[380px]"
            style={{ backfaceVisibility: "hidden" }}
          >
            <span className="text-5xl mb-4">{emoji}</span>
            <h2 className="text-5xl font-extrabold text-gray-800 mb-2 tracking-wide">{word.word}</h2>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xl text-gray-400 font-mono">{word.phonetic}</span>
              <button
                onClick={handleSpeak}
                className="w-10 h-10 rounded-full bg-purple-100 hover:bg-purple-200 flex items-center justify-center transition-colors"
                aria-label="听发音"
              >
                <span className="text-xl">🔊</span>
              </button>
            </div>
            <p className="text-gray-400 text-sm mt-4">点击翻转查看释义</p>
          </div>

          {/* Back */}
          <div
            className="w-full bg-gradient-to-br from-purple-50 to-pink-50 rounded-[2rem] shadow-xl border-2 border-purple-200 p-8 flex flex-col items-center justify-center min-h-[380px]"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <span className="text-5xl mb-4">📖</span>
            <h3 className="text-3xl font-extrabold text-purple-700 mb-2">{word.word}</h3>
            <p className="text-xl text-gray-600 mb-1">{word.meaning}</p>
            <span className="inline-block bg-purple-100 text-purple-600 text-sm px-3 py-1 rounded-full mb-4">
              {word.type}
            </span>

            {showExample && (
              <div className="w-full bg-white/70 rounded-xl p-4 mb-4 animate-bounce-in">
                <p className="text-gray-700 text-base leading-relaxed">{word.example}</p>
                <button
                  onClick={handleSpeakExample}
                  className="mt-2 text-purple-500 hover:text-purple-700 text-sm font-semibold flex items-center gap-1"
                >
                  🔊 听例句
                </button>
              </div>
            )}

            <button
              onClick={(e) => { e.stopPropagation(); setShowExample(!showExample); }}
              className="text-sm text-purple-400 hover:text-purple-600 transition-colors"
            >
              {showExample ? "收起例句" : "查看例句"}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={onPrev}
          className="w-14 h-14 rounded-full bg-white border-2 border-gray-200 text-gray-400 hover:border-gray-400 hover:text-gray-600 flex items-center justify-center transition-all text-xl font-bold shadow-sm"
        >
          ←
        </button>

        <button
          onClick={onDontKnow}
          className="px-8 py-3 rounded-full bg-red-50 border-2 border-red-200 text-red-500 hover:bg-red-100 font-bold text-lg transition-all shadow-sm"
        >
          😣 不认识
        </button>

        <button
          onClick={onKnow}
          className="px-8 py-3 rounded-full bg-green-50 border-2 border-green-200 text-green-500 hover:bg-green-100 font-bold text-lg transition-all shadow-sm"
        >
          😊 认识
        </button>

        <button
          onClick={onNext}
          className="w-14 h-14 rounded-full bg-white border-2 border-gray-200 text-gray-400 hover:border-gray-400 hover:text-gray-600 flex items-center justify-center transition-all text-xl font-bold shadow-sm"
        >
          →
        </button>
      </div>
    </div>
  );
}
