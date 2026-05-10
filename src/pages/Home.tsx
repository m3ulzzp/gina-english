import { useStore } from "../store/useStore";
import { GRADE_CONFIG } from "../data/words";
import { Link } from "react-router-dom";

export function Home() {
  const { grade, setGrade, streak, todayLearned, todayCorrect, todayTotal } = useStore();

  const todayRate = todayTotal > 0 ? Math.round((todayCorrect / todayTotal) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* Floating background decorations */}
      <div className="floating-deco top-16 left-8 text-6xl" style={{ animationDelay: "0s" }}>☁️</div>
      <div className="floating-deco top-32 right-12 text-5xl" style={{ animationDelay: "1s" }}>⭐</div>
      <div className="floating-deco top-48 left-16 text-4xl" style={{ animationDelay: "2s" }}>🌈</div>
      <div className="floating-deco bottom-32 right-8 text-5xl" style={{ animationDelay: "0.5s" }}>🎈</div>
      <div className="floating-deco bottom-48 left-12 text-4xl" style={{ animationDelay: "1.5s" }}>🌟</div>
      <div className="floating-deco top-60 right-24 text-3xl" style={{ animationDelay: "3s" }}>🦋</div>

      {/* Hero section */}
      <div className="max-w-4xl mx-auto px-4 pt-10 sm:pt-14 pb-4 text-center relative z-10">
        {/* Logo area */}
        <div className="w-24 h-24 mx-auto mb-5 rounded-3xl bg-gradient-to-br from-purple-400 via-pink-400 to-orange-300 flex items-center justify-center shadow-xl shadow-purple-200/50 animate-gentle-bounce">
          <span className="text-5xl">📚</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 gradient-text mb-3 tracking-tight">
          Gina 学英语
        </h1>
        <p className="text-base text-gray-400 mb-6">每天背几个单词，英语越来越棒！💪</p>

        {/* Today's stats */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-2">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg border border-orange-100 flex flex-col items-center min-w-[90px]">
            <div className="text-2xl sm:text-3xl font-black text-orange-500">{streak}</div>
            <div className="text-[11px] text-gray-400 mt-0.5">连续天数</div>
            <span className="text-xs mt-1">🔥</span>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg border border-green-100 flex flex-col items-center min-w-[90px]">
            <div className="text-2xl sm:text-3xl font-black text-green-500">{todayLearned}</div>
            <div className="text-[11px] text-gray-400 mt-0.5">今日已学</div>
            <span className="text-xs mt-1">📖</span>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg border border-purple-100 flex flex-col items-center min-w-[90px]">
            <div className="text-2xl sm:text-3xl font-black text-purple-500">{todayRate}%</div>
            <div className="text-[11px] text-gray-400 mt-0.5">正确率</div>
            <span className="text-xs mt-1">✅</span>
          </div>
        </div>
      </div>

      {/* Grade selection */}
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 relative z-10">
        <div className="flex items-center justify-center gap-2 mb-5">
          <h2 className="text-xl font-black text-gray-700">📋 选一个年级</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-200" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-200" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {(Object.entries(GRADE_CONFIG) as [string, typeof GRADE_CONFIG["grade1"]][]).map(([key, config], idx) => (
            <Link
              key={key}
              to="/wordcard"
              onClick={() => setGrade(key as any)}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all border-2 cursor-pointer group relative overflow-hidden"
              style={{
                borderColor: key === grade ? config.color : "transparent",
                animationDelay: `${idx * 0.1}s`,
              }}
            >
              {/* Background decoration */}
              <div
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-5 group-hover:opacity-10 transition-opacity"
                style={{ background: config.color }}
              />
              <div className="text-4xl sm:text-5xl mb-2 group-hover:scale-110 transition-transform relative">
                {config.emoji}
              </div>
              <h3 className="text-base font-black text-gray-800 relative">{config.label}</h3>
              <p className="text-[11px] text-gray-400 mt-0.5 relative">{config.description}</p>
              {key === grade && (
                <div className="mt-2 inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full relative" style={{ background: config.color + "20", color: config.color }}>
                  ✨ 当前
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6 relative z-10">
        <div className="flex items-center justify-center gap-2 mb-5">
          <h2 className="text-xl font-black text-gray-700">🚀 开始学习</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-200" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-200" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <Link
            to="/wordcard"
            className="bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-purple-200/40 transition-all text-center group"
          >
            <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-3xl">🃏</span>
            </div>
            <h3 className="text-base font-black">卡片背词</h3>
            <p className="text-sm text-purple-100 mt-1">看图识词，翻转记忆</p>
          </Link>
          <Link
            to="/spelling"
            className="bg-gradient-to-br from-pink-400 to-pink-600 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-pink-200/40 transition-all text-center group"
          >
            <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-3xl">✏️</span>
            </div>
            <h3 className="text-base font-black">拼写练习</h3>
            <p className="text-sm text-pink-100 mt-1">听音拼词，巩固记忆</p>
          </Link>
          <Link
            to="/wrongbook"
            className="bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-orange-200/40 transition-all text-center group"
          >
            <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-3xl">📕</span>
            </div>
            <h3 className="text-base font-black">错词本</h3>
            <p className="text-sm text-orange-100 mt-1">复习错题，查漏补缺</p>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-gray-300 text-sm relative z-10">
        <p>Gina 学英语 · 让学习变得简单有趣 🎈</p>
      </div>
    </div>
  );
}
