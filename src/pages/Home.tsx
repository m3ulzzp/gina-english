import { useStore } from "../store/useStore";
import { GRADE_CONFIG } from "../data/words";
import { Link } from "react-router-dom";

export function Home() {
  const { grade, setGrade, streak, todayLearned, todayCorrect, todayTotal } = useStore();

  const todayRate = todayTotal > 0 ? Math.round((todayCorrect / todayTotal) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-pink-50 to-purple-50 pb-8">
      {/* Hero section */}
      <div className="max-w-4xl mx-auto px-4 pt-8 sm:pt-12 pb-6 text-center">
        <div className="text-7xl sm:text-8xl mb-4 animate-float">📚</div>
        <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 gradient-text mb-3">
          Gina 学英语
        </h1>
        <p className="text-lg text-gray-400 mb-4">每天背几个单词，英语越来越棒！💪</p>

        {/* Today's stats */}
        <div className="flex items-center justify-center gap-3 sm:gap-5 mt-4">
          <div className="bg-white rounded-[1.5rem] px-5 sm:px-6 py-4 shadow-lg border-2 border-orange-50">
            <div className="text-3xl sm:text-4xl font-black text-orange-500">{streak}</div>
            <div className="text-xs text-gray-400 mt-1">连续天数 🔥</div>
          </div>
          <div className="bg-white rounded-[1.5rem] px-5 sm:px-6 py-4 shadow-lg border-2 border-green-50">
            <div className="text-3xl sm:text-4xl font-black text-green-500">{todayLearned}</div>
            <div className="text-xs text-gray-400 mt-1">今日已学 📖</div>
          </div>
          <div className="bg-white rounded-[1.5rem] px-5 sm:px-6 py-4 shadow-lg border-2 border-purple-50">
            <div className="text-3xl sm:text-4xl font-black text-purple-500">{todayRate}%</div>
            <div className="text-xs text-gray-400 mt-1">正确率 ✅</div>
          </div>
        </div>
      </div>

      {/* Grade selection */}
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        <h2 className="text-2xl font-black text-gray-700 mb-5 text-center">📋 选一个年级吧</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {(Object.entries(GRADE_CONFIG) as [string, typeof GRADE_CONFIG["grade1"]][]).map(([key, config]) => (
            <Link
              key={key}
              to="/wordcard"
              onClick={() => setGrade(key as any)}
              className="bg-white rounded-[1.75rem] p-5 sm:p-6 shadow-lg hover:shadow-2xl transition-all border-[3px] cursor-pointer group relative overflow-hidden"
              style={{ borderColor: key === grade ? config.color : "transparent" }}
            >
              {/* Background decoration */}
              <div
                className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"
                style={{ background: config.color }}
              />
              <div className="text-5xl sm:text-6xl mb-3 group-hover:scale-110 transition-transform relative">
                {config.emoji}
              </div>
              <h3 className="text-xl font-black text-gray-800 relative">{config.label}</h3>
              <p className="text-xs text-gray-400 mt-1 relative">{config.description}</p>
              {key === grade && (
                <div className="mt-3 inline-block text-xs font-bold px-3 py-1 rounded-full relative" style={{ background: config.color + "20", color: config.color }}>
                  ✨ 当前年级
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        <h2 className="text-2xl font-black text-gray-700 mb-5 text-center">🚀 开始学习</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <Link
            to="/wordcard"
            className="bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-[1.75rem] p-6 shadow-xl hover:shadow-2xl transition-all text-center group"
          >
            <div className="text-5xl sm:text-6xl mb-3 group-hover:scale-110 transition-transform">🃏</div>
            <h3 className="text-lg font-black">卡片背词</h3>
            <p className="text-sm text-purple-100 mt-1">看图识词，翻转记忆</p>
          </Link>
          <Link
            to="/spelling"
            className="bg-gradient-to-br from-pink-400 to-pink-600 text-white rounded-[1.75rem] p-6 shadow-xl hover:shadow-2xl transition-all text-center group"
          >
            <div className="text-5xl sm:text-6xl mb-3 group-hover:scale-110 transition-transform">✏️</div>
            <h3 className="text-lg font-black">拼写练习</h3>
            <p className="text-sm text-pink-100 mt-1">听音拼词，巩固记忆</p>
          </Link>
          <Link
            to="/wrongbook"
            className="bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-[1.75rem] p-6 shadow-xl hover:shadow-2xl transition-all text-center group"
          >
            <div className="text-5xl sm:text-6xl mb-3 group-hover:scale-110 transition-transform">📕</div>
            <h3 className="text-lg font-black">错词本</h3>
            <p className="text-sm text-orange-100 mt-1">复习错题，查漏补缺</p>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-gray-300 text-sm">
        <p>Gina 学英语 · 让学习变得简单有趣 🎈</p>
      </div>
    </div>
  );
}
