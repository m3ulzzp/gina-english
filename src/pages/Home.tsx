import { useStore } from "../store/useStore";
import { GRADE_CONFIG } from "../data/words";
import { Link } from "react-router-dom";

export function Home() {
  const { grade, setGrade, streak, todayLearned, todayCorrect, todayTotal } = useStore();

  const todayRate = todayTotal > 0 ? Math.round((todayCorrect / todayTotal) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-pink-50 to-purple-50">
      {/* Hero section */}
      <div className="max-w-4xl mx-auto px-4 pt-12 pb-8 text-center">
        <div className="text-7xl mb-4 animate-float">📚</div>
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent mb-3">
          Gina 学英语
        </h1>
        <p className="text-lg text-gray-500 mb-2">每天背几个单词，英语越来越棒！💪</p>

        {/* Today's stats */}
        <div className="flex items-center justify-center gap-6 mt-6">
          <div className="bg-white rounded-2xl px-6 py-4 shadow-md">
            <div className="text-3xl font-extrabold text-orange-500">{streak}</div>
            <div className="text-xs text-gray-400">连续天数 🔥</div>
          </div>
          <div className="bg-white rounded-2xl px-6 py-4 shadow-md">
            <div className="text-3xl font-extrabold text-green-500">{todayLearned}</div>
            <div className="text-xs text-gray-400">今日已学 📖</div>
          </div>
          <div className="bg-white rounded-2xl px-6 py-4 shadow-md">
            <div className="text-3xl font-extrabold text-purple-500">{todayRate}%</div>
            <div className="text-xs text-gray-400">正确率 ✅</div>
          </div>
        </div>
      </div>

      {/* Grade selection */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-extrabold text-gray-700 mb-6 text-center">📋 选择年级</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {(Object.entries(GRADE_CONFIG) as [string, typeof GRADE_CONFIG["grade1"]][]).map(([key, config]) => (
            <Link
              key={key}
              to="/wordcard"
              onClick={() => setGrade(key as any)}
              className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all border-2 cursor-pointer group"
              style={{ borderColor: key === grade ? config.color : "transparent" }}
            >
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{config.emoji}</div>
              <h3 className="text-xl font-bold text-gray-800">{config.label}</h3>
              <p className="text-sm text-gray-400 mt-1">{config.description}</p>
              {key === grade && (
                <div className="mt-3 inline-block bg-green-100 text-green-600 text-xs font-bold px-3 py-1 rounded-full">
                  当前年级
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-extrabold text-gray-700 mb-6 text-center">🚀 快速开始</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to="/wordcard"
            className="bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all text-center group"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🃏</div>
            <h3 className="text-lg font-bold">卡片背词</h3>
            <p className="text-sm text-purple-100 mt-1">看图识词，翻转记忆</p>
          </Link>
          <Link
            to="/spelling"
            className="bg-gradient-to-br from-pink-400 to-pink-600 text-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all text-center group"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">✏️</div>
            <h3 className="text-lg font-bold">拼写练习</h3>
            <p className="text-sm text-pink-100 mt-1">听音拼词，巩固记忆</p>
          </Link>
          <Link
            to="/wrongbook"
            className="bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all text-center group"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📕</div>
            <h3 className="text-lg font-bold">错词本</h3>
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
