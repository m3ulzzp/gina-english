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

  // Pick words to practice (wrong book first, then new words)
  useEffect(() => {
    const wrongWords: Word[] = [];
    for (const card of Object.values(wrongBook)) {
      wrongWords.push(card.word);
    }
    const newWords = words.filter((w) => !wrongWords.find((rw) => rw.id === w.id));
    // Shuffle and combine
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

  if (wordList.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-pink-50">
        <div className="text-center">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">暂无单词</h2>
          <p className="text-gray-500">请先选择年级或添加错词本单词。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-pink-50 to-purple-50 py-8 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent mb-2">
            ✏️ 拼写练习
          </h1>
          <div className="flex items-center justify-center gap-4">
            <div className="bg-white rounded-full px-4 py-2 shadow-sm">
              <span className="text-sm text-gray-500">连对</span>
              <span className="ml-2 text-lg font-bold text-orange-500">🔥 {streak}</span>
            </div>
            <div className="bg-white rounded-full px-4 py-2 shadow-sm">
              <span className="text-sm text-gray-500">进度</span>
              <span className="ml-2 text-lg font-bold text-purple-500">
                {currentWord ? wordList.indexOf(currentWord) + 1 : 0}/{wordList.length}
              </span>
            </div>
          </div>
        </div>

        {/* Word display */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-pink-100 p-8 mb-6 text-center">
          <div className="text-5xl mb-4">🎯</div>
          <p className="text-gray-500 mb-2">听发音，写出单词：</p>

          <button
            onClick={handleSpeak}
            className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-pink-400 to-purple-500 text-white text-3xl shadow-lg hover:shadow-xl hover:scale-105 transition-all mb-4"
            aria-label="听发音"
          >
            🔊
          </button>

          <form onSubmit={handleSubmit} className="mt-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="输入英文单词..."
              autoFocus
              className={`w-full text-center text-3xl font-bold py-4 px-6 rounded-2xl border-4 outline-none transition-all ${
                result === "correct"
                  ? "border-green-300 bg-green-50 text-green-600"
                  : result === "wrong"
                  ? "border-red-300 bg-red-50 text-red-600"
                  : "border-pink-200 focus:border-pink-400"
              }`}
            />

            <div className="flex gap-3 mt-4">
              {!result && (
                <button
                  type="button"
                  onClick={handleHint}
                  className="flex-1 py-3 rounded-2xl bg-yellow-50 border-2 border-yellow-200 text-yellow-600 font-bold hover:bg-yellow-100 transition-colors"
                >
                  💡 提示
                </button>
              )}
              <button
                type="submit"
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-pink-400 to-purple-500 text-white font-bold hover:shadow-lg transition-all"
              >
                确认 ✓
              </button>
            </div>
          </form>

          {/* Result feedback */}
          {result && (
            <div className={`mt-6 p-4 rounded-2xl animate-bounce-in ${
              result === "correct" ? "bg-green-50" : "bg-red-50"
            }`}>
              {result === "correct" ? (
                <div>
                  <div className="text-3xl mb-2">🎉</div>
                  <p className="text-green-600 font-bold text-lg">太棒了！完全正确！</p>
                  {streak >= 3 && <p className="text-orange-500 text-sm mt-1">🔥 连对 {streak} 题！</p>}
                </div>
              ) : (
                <div>
                  <div className="text-3xl mb-2">😅</div>
                  <p className="text-red-500 font-bold text-lg">再想想！</p>
                  <p className="text-gray-500 mt-1">
                    正确答案：<span className="font-bold text-gray-700">{currentWord?.word}</span>
                  </p>
                  {currentWord && <p className="text-gray-400 text-sm mt-1">{currentWord.meaning}</p>}
                </div>
              )}
            </div>
          )}

          {/* Hint */}
          {showHint && currentWord && (
            <div className="mt-4 p-3 bg-yellow-50 rounded-xl">
              <p className="text-sm text-yellow-700">
                提示：{currentWord.word[0]}...（共 {currentWord.word.length} 个字母）
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="text-center">
          <button
            onClick={nextWord}
            className="text-purple-400 hover:text-purple-600 font-bold text-lg transition-colors"
          >
            跳过 → 下一个单词
          </button>
        </div>
      </div>
    </div>
  );
}
