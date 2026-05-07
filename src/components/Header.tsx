import { Link } from "react-router-dom";
import { useStore } from "../store/useStore";

export function Header() {
  const { grade, setGrade, streak, todayCorrect, todayTotal } = useStore();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-100 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-3xl group-hover:animate-bounce">📚</span>
          <div>
            <h1 className="text-xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Gina 学英语
            </h1>
            <p className="text-[10px] text-gray-400 -mt-0.5">每天进步一点点 ✨</p>
          </div>
        </Link>

        {/* Stats bar */}
        <div className="flex items-center gap-3">
          {/* Streak */}
          <div className="flex items-center gap-1 bg-orange-50 px-3 py-1.5 rounded-full">
            <span className="text-lg">🔥</span>
            <span className="text-sm font-bold text-orange-600">{streak}</span>
          </div>

          {/* Today progress */}
          <div className="hidden sm:flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full">
            <span className="text-sm">✅</span>
            <span className="text-sm font-bold text-green-600">
              {todayCorrect}/{todayTotal}
            </span>
          </div>

          {/* Grade selector */}
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value as any)}
            className="text-sm font-semibold bg-white border-2 border-purple-200 rounded-xl px-3 py-1.5 outline-none focus:border-purple-400 transition-colors cursor-pointer"
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
