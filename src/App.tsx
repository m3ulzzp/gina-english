import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { WordCardPage } from "./pages/WordCard";
import { SpellingPage } from "./pages/Spelling";
import { WrongBook } from "./pages/WrongBook";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wordcard" element={<WordCardPage />} />
            <Route path="/spelling" element={<SpellingPage />} />
            <Route path="/wrongbook" element={<WrongBook />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
