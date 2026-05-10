import { useState, useEffect } from "react";
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

const typeColors: Record<string, string> = {
  noun: "from-blue-400 to-indigo-400",
  verb: "from-green-400 to-emerald-400",
  adjective: "from-pink-400 to-rose-400",
  adverb: "from-purple-400 to-violet-400",
  preposition: "from-orange-400 to-amber-400",
  conjunction: "from-teal-400 to-cyan-400",
  pronoun: "from-red-400 to-pink-400",
};

const starColors = ["#FFD93D", "#FF8FF8", "#6BCB77", "#4D96FF", "#FF6B6B"];

export function WordCard({ word, isFlipped, onFlip, onNext, onPrev, onKnow, onDontKnow, progress }: WordCardProps) {
  const [showExample, setShowExample] = useState(false);
  const [showStar, setShowStar] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const emoji = typeEmojis[word.type] || "📝";
  const typeColor = typeColors[word.type] || "from-gray-400 to-gray-500";

  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [word.word]);

  const handleSpeak = () => speak(word.word);
  const handleSpeakExample = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakExample(word.example);
  };

  const handleFlip = () => {
    setIsAnimating(true);
    onFlip();
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Progress stars
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = progress.current <= progress.total * ((i + 1) / 5);
    return {
      color: filled ? starColors[i % starColors.length] : "#E5E7EB",
      filled,
    };
  });

  const progressPercent = (progress.current / progress.total) * 100;

  return (
    <div className="w-full max-w-lg mx-auto px-3 sm:px-0">
      {/* Progress bar */}
      <div className="mb-6 sm:mb-8">
        {/* Stars */}
        <div className="flex justify-center gap-1.5 mb-3">
          {stars.map((s, i) => (
            <span
              key={i}
              className="text-2xl transition-all duration-300"
              style={{ color: s.color, transform: s.filled ? "scale(1.1)" : "scale(1)" }}
            >
              ⭐
            </span>
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-400 mb-2 px-1">
          <span className="font-medium">第 {progress.current} 个</span>
          <span className="font-bold bg-gradient-to-r from-purple-600 to-pink-500 gradient-text">
            {progress.current} / {progress.total}
          </span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 rounded-full transition-all duration-700 ease-out relative"
            style={{ width: `${progressPercent}%` }}
          >
            <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Card */}
      <div
        className={`relative cursor-pointer perspective-1000 card-enter ${isAnimating ? "animate-shake" : ""}`}
        onClick={handleFlip}
        role="button"
        aria-label={isFlipped ? "点击收起释义" : "点击显示释义"}
        style={{ perspective: "1000px" }}
      >
        <div
          className="relative w-full transition-transform duration-700 ease-in-out"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front */}
          <div
            className="w-full rounded-3xl shadow-2xl border border-purple-50/50 bg-white overflow-hidden"
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* Top gradient bar */}
            <div className={`h-2 bg-gradient-to-r ${typeColor}`} />

            {/* Image area */}
            <div className="w-full aspect-square max-h-[260px] bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30 flex items-center justify-center relative overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute top-4 left-4 w-16 h-16 rounded-full bg-purple-100/30 blur-xl" />
              <div className="absolute bottom-4 right-4 w-20 h-20 rounded-full bg-pink-100/30 blur-xl" />

              {/* Image */}
              {!imageError && word.image ? (
                <img
                  src={word.image}
                  alt={word.word}
                  className={`w-full h-full object-cover transition-all duration-500 ${imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"}`}
                  loading="lazy"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
              ) : null}

              {/* Loading shimmer */}
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 image-placeholder" />
              )}

              {/* Fallback emoji */}
              <span className={`text-8xl sm:text-9xl transition-all duration-300 ${imageError || !word.image ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
                {emoji}
              </span>

              {/* Type badge */}
              <div className={`absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r ${typeColor} text-white text-xs font-bold shadow-md`}>
                {word.type}
              </div>

              {/* Decorative dots */}
              <div className="absolute top-4 right-4 flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-pink-300/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-purple-300/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-300/60" />
              </div>
            </div>

            {/* Content area */}
            <div className="p-6 sm:p-8 flex flex-col items-center">
              {/* Word */}
              <h2 className="text-5xl sm:text-6xl font-black text-gray-800 mb-4 tracking-tight">{word.word}</h2>

              {/* Phonetic + Audio */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-base text-gray-400 font-mono bg-gray-50 px-4 py-1.5 rounded-full">{word.phonetic}</span>
                <button
                  onClick={handleSpeak}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 text-white shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 flex items-center justify-center transition-all tap-target"
                  aria-label="听发音"
                >
                  <span className="text-xl">🔊</span>
                </button>
              </div>

              {/* Hint text */}
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <span className="animate-bounce">👆</span>
                <span>点一下卡片看看中文</span>
              </div>
            </div>
          </div>

          {/* Back */}
          <div
            className="w-full bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 rounded-3xl shadow-2xl border border-pink-100/50 overflow-hidden"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            {/* Top gradient bar */}
            <div className="h-2 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400" />

            <div className="p-6 sm:p-8 flex flex-col items-center">
              <span className="text-5xl mb-3 animate-float">📖</span>
              <h3 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-purple-700 to-pink-600 gradient-text mb-2">{word.word}</h3>
              <p className="text-2xl sm:text-3xl text-gray-700 mb-4 font-bold">{word.meaning}</p>
              <span className={`inline-block px-4 py-1.5 rounded-full bg-gradient-to-r ${typeColor} text-white text-xs font-bold shadow-md`}>
                {emoji} {word.type}
              </span>

              {/* Example */}
              {showExample && (
                <div className="w-full bg-white/80 backdrop-blur-sm rounded-2xl p-5 mt-5 animate-bounce-in shadow-sm border border-purple-100">
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-medium">{word.example}</p>
                  <button
                    onClick={handleSpeakExample}
                    className="mt-3 text-purple-500 hover:text-purple-700 text-sm font-bold flex items-center gap-1.5 transition-colors tap-target"
                  >
                    🔊 听例句
                  </button>
                </div>
              )}

              <button
                onClick={(e) => { e.stopPropagation(); setShowExample(!showExample); }}
                className="mt-4 text-sm text-purple-400 hover:text-purple-600 transition-colors font-semibold px-4 py-2 rounded-full hover:bg-purple-50"
              >
                {showExample ? "🔽 收起例句" : "🔍 查看例句"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 safe-bottom">
        <button
          onClick={onPrev}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border-2 border-gray-100 text-gray-400 hover:border-purple-300 hover:text-purple-500 hover:bg-purple-50 flex items-center justify-center transition-all text-xl font-bold shadow-sm active:scale-90 tap-target"
        >
          ⬅️
        </button>

        <button
          onClick={onDontKnow}
          className="flex-1 max-w-[200px] h-14 sm:h-16 rounded-2xl bg-gradient-to-r from-red-400 to-pink-400 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:shadow-red-200/40 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 transition-all tap-target"
        >
          <span className="text-xl">😣</span>
          <span>不认识</span>
        </button>

        <button
          onClick={() => { onKnow(); setShowStar(true); setTimeout(() => setShowStar(false), 1500); }}
          className="flex-1 max-w-[200px] h-14 sm:h-16 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-400 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:shadow-green-200/40 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 transition-all tap-target"
        >
          <span className="text-xl">😊</span>
          <span>认识</span>
        </button>

        <button
          onClick={onNext}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border-2 border-gray-100 text-gray-400 hover:border-purple-300 hover:text-purple-500 hover:bg-purple-50 flex items-center justify-center transition-all text-xl font-bold shadow-sm active:scale-90 tap-target"
        >
          ➡️
        </button>
      </div>

      {/* Star burst effect */}
      {showStar && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="animate-star-pop text-8xl">🌟</div>
        </div>
      )}
    </div>
  );
}
