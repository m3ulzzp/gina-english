import { Link } from "react-router-dom";
import { useStore } from "../store/useStore";

export function Header() {
  const { grade, setGrade, streak, todayCorrect, todayTotal } = useStore();

  return (
    <header className="sticky top-0 z-50 glass-strong border-b border-white/30 shadow-[0_2px_20px_rgba(0,0,0,0.06)]">
      <div className="max-w-4xl mx-auto px-4 py-2.5 sm:py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
            <span className="text-xl">📚</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-black bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 gradient-text leading-tight">
              Gina 学英语
            </h1>
            <p className="text-[10px] text-gray-400 -mt-0.5">每天进步一点点 ✨</p>
          </div>
        </Link>

        {/* Stats bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak */}
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-orange-50 to-amber-50 px-3 py-1.5 rounded-full border border-orange-100 shadow-sm">
            <span className="text-sm animate-sparkle">🔥</span>
            <span className="text-sm font-black text-orange-600">{streak}</span>
          </div>

          {/* Today progress */}
          <div className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-green-50 to-emerald-50 px-3 py-1.5 rounded-full border border-green-100 shadow-sm">
            <span className="text-sm">✅</span>
            <span className="text-sm font-black text-green-600">
              {todayCorrect}/{todayTotal}
            </span>
          </div>

          {/* Grade selector */}
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value as any)}
            className="text-sm font-bold bg-white/80 border-2 border-purple-100 rounded-xl px-3 py-1.5 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all cursor-pointer shadow-sm"
          >
            <option value="grade1">🌱 一年级</option>
            <option value="grade2">🌿 二年级</option>
            <option value="grade3">🌳 三年级</option>
            <option value="grade4">🌻 四年级</option>
            <option value="grade5">🌺 五年级</option>
            <option value="grade6">🏆 六年级</option>
          </select>
        </div>
      </div>
    </header>
  );
}
