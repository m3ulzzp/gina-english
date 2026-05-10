import { useState, useEffect, useCallback } from "react";
import { useStore } from "../store/useStore";
import { getWordsByGrade, type Word } from "../data/words";
import { speak } from "../utils/speech";

export function SpellingPage() {
  const { grade, wrongBook, incrementTodayCorrect, incrementTodayTotal } = useStore();
  const words = getWordsByGrade(grade);

  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [input, setInput] = useState("");
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [wordList, setWordList] = useState<Word[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  // Pick words to practice (wrong book first, then new words)
  useEffect(() => {
    const wrongWords: Word[] = [];
    for (const card of Object.values(wrongBook)) {
      wrongWords.push(card.word);
    }
    const newWords = words.filter((w) => !wrongWords.find((rw) => rw.id === w.id));
    const shuffled = [...wrongWords, ...newWords].sort(() => Math.random() - 0.5);
    setWordList(shuffled.slice(0, 10));
  }, [grade, wrongBook, words]);

  useEffect(() => {
    if (wordList.length > 0 && !currentWord) {
      nextWord();
    }
  }, [wordList]);

  const nextWord = useCallback(() => {
    if (wordList.length === 0) return;
    const idx = currentWord ? (wordList.indexOf(currentWord) + 1) % wordList.length : 0;
    setCurrentWord(wordList[idx]);
    setInput("");
    setResult(null);
    setShowHint(false);
  }, [wordList, currentWord]);

  const handleSpeak = useCallback(() => {
    if (currentWord) speak(currentWord.word);
  }, [currentWord]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!currentWord) return;

      const normalized = input.trim().toLowerCase();
      const correct = normalized === currentWord.word.toLowerCase();

      setResult(correct ? "correct" : "wrong");
      incrementTodayTotal();
      if (correct) {
        incrementTodayCorrect();
        setStreak((s) => s + 1);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
      } else {
        setStreak(0);
      }
    },
    [currentWord, input, incrementTodayTotal, incrementTodayCorrect]
  );

  const handleHint = useCallback(() => {
    if (!currentWord) return;
    setShowHint(true);
  }, [currentWord]);

  // Confetti for correct answers
  const confettiEmojis = ["🎉", "⭐", "✨", "🌟", "💫", "🎊", "🏆", "💪"];

  if (wordList.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-pink-50">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-float">📝</div>
          <h2 className="text-2xl font-black text-gray-700 mb-2">暂无单词</h2>
          <p className="text-gray-400">请先选择年级或添加错词本单词。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-pink-50 to-purple-50 py-6 sm:py-8 px-3 sm:px-4 relative overflow-hidden">
      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-confetti-fall"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.8}s`,
                animationDuration: `${2 + Math.random() * 1.5}s`,
              }}
            >
              {confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)]}
            </div>
          ))}
        </div>
      )}

      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-pink-500 to-orange-400 gradient-text mb-3">
            ✏️ 拼写练习
          </h1>
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <div className="bg-white rounded-full px-4 py-2 shadow-md border-2 border-orange-50">
              <span className="text-xs text-gray-400 block">连对</span>
              <span className="text-lg font-black text-orange-500">🔥 {streak}</span>
            </div>
            <div className="bg-white rounded-full px-4 py-2 shadow-md border-2 border-purple-50">
              <span className="text-xs text-gray-400 block">进度</span>
              <span className="text-lg font-black text-purple-500">
                {currentWord ? wordList.indexOf(currentWord) + 1 : 0}/{wordList.length}
              </span>
            </div>
          </div>
        </div>

        {/* Word display */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl border-[3px] border-pink-100 p-6 sm:p-8 mb-6 text-center relative overflow-hidden">
          {/* Decorative corner dots */}
          <div className="absolute top-4 left-4 flex gap-1">
            <div className="w-2 h-2 rounded-full bg-pink-300/50" />
            <div className="w-2 h-2 rounded-full bg-purple-300/50" />
            <div className="w-2 h-2 rounded-full bg-yellow-300/50" />
          </div>

          <div className="text-6xl sm:text-7xl mb-4 animate-float">🎯</div>
          <p className="text-gray-400 mb-4 text-base">听发音，写出单词：</p>

          <button
            onClick={handleSpeak}
            className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-500 text-white text-4xl shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all tap-target relative"
            aria-label="听发音"
          >
            🔊
            <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping" style={{ animationDuration: "2s" }} />
          </button>

          <form onSubmit={handleSubmit} className="mt-6">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="输入英文单词..."
              autoFocus
              disabled={result !== null}
              className={`w-full text-center text-3xl sm:text-4xl font-black py-5 px-6 rounded-2xl border-[4px] outline-none transition-all ${
                result === "correct"
                  ? "border-green-300 bg-green-50 text-green-600 animate-bounce-in"
                  : result === "wrong"
                  ? "border-red-300 bg-red-50 text-red-500 animate-shake"
                  : "border-pink-200 focus:border-pink-400 focus:bg-pink-50/30"
              } disabled:opacity-60`}
            />

            <div className="flex gap-3 mt-4">
              {!result && (
                <button
                  type="button"
                  onClick={handleHint}
                  className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-yellow-300 to-amber-400 text-yellow-800 font-bold hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all tap-target flex items-center justify-center gap-2"
                >
                  💡 提示
                </button>
              )}
              <button
                type="submit"
                disabled={!input.trim() || result !== null}
                className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-pink-400 to-purple-500 text-white font-black text-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-40 disabled:hover:scale-100 tap-target flex items-center justify-center gap-2"
              >
                确认 ✓
              </button>
            </div>
          </form>

          {/* Result feedback */}
          {result && (
            <div className={`mt-6 p-5 rounded-2xl animate-bounce-in ${
              result === "correct" ? "bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200" : "bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200"
            }`}>
              {result === "correct" ? (
                <div className="text-center">
                  <div className="text-5xl mb-2 animate-star-pop">🎉</div>
                  <p className="text-green-600 font-black text-xl">太棒了！完全正确！</p>
                  {streak >= 3 && <p className="text-orange-500 text-sm mt-2 font-bold">🔥 连对 {streak} 题！好厉害！</p>}
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-5xl mb-2">😅</div>
                  <p className="text-red-500 font-black text-xl">再想想！</p>
                  <p className="text-gray-500 mt-2">
                    正确答案：<span className="font-black text-2xl text-gray-800">{currentWord?.word}</span>
                  </p>
                  {currentWord && <p className="text-gray-400 text-sm mt-1">{currentWord.meaning}</p>}
                </div>
              )}
            </div>
          )}

          {/* Hint */}
          {showHint && currentWord && (
            <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl border-2 border-yellow-200">
              <p className="text-sm text-yellow-700 font-semibold">
                💡 提示：{currentWord.word[0]}...（共 {currentWord.word.length} 个字母）
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="text-center">
          <button
            onClick={nextWord}
            className="text-purple-400 hover:text-purple-600 font-bold text-lg transition-colors px-6 py-3 rounded-full hover:bg-purple-50"
          >
            跳过 → 下一个单词
          </button>
        </div>
      </div>
    </div>
  );
}
