import { useState, useEffect } from 'react';
import Card from './components/Card';
import WrongWordList from './components/WrongWordList';
import Stats from './components/Stats';
import { words, getUnits, getWordsByUnit } from './data/words';
import { getProgress, saveProgress, getWrongWords, removeFromWrongWords } from './utils/storage';
import { calculateNextReview, getReviewWords, getStats } from './utils/sm2';

export default function App() {
  const [currentView, setCurrentView] = useState('learn'); // learn, wrong, stats
  const [currentUnit, setCurrentUnit] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(getProgress());
  const [wrongWords, setWrongWords] = useState(getWrongWords());
  const [isFlipped, setIsFlipped] = useState(false);
  const [studyMode, setStudyMode] = useState('normal'); // normal, wrong

  useEffect(() => {
    setProgress(getProgress());
    setWrongWords(getWrongWords());
  }, []);

  const units = getUnits();
  const currentWords = studyMode === 'wrong' 
    ? wrongWords.map(w => words.find(word => word.word === w)).filter(Boolean)
    : getWordsByUnit(currentUnit);
  
  const currentWord = currentWords[currentIndex];
  
  const stats = getStats(progress);

  const handleFlip = (word) => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentIndex < currentWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    } else {
      setCurrentIndex(currentWords.length - 1);
      setIsFlipped(false);
    }
  };

  const handleRate = (quality) => {
    if (!currentWord) return;
    
    const newProgress = calculateNextReview(
      progress[currentWord.word] || {
        easeFactor: 2.5,
        interval: 0,
        repetitions: 0,
        nextReview: null,
        lastReview: null
      },
      quality
    );
    
    const newProgressMap = {
      ...progress,
      [currentWord.word]: newProgress
    };
    
    setProgress(newProgressMap);
    saveProgress(newProgressMap);
    
    if (quality < 3) {
      // 答错，加入错词本
      const wrongWordsList = getWrongWords();
      if (!wrongWordsList.includes(currentWord.word)) {
        wrongWordsList.push(currentWord.word);
        localStorage.setItem('gina_wrong_words', JSON.stringify(wrongWordsList));
        setWrongWords(wrongWordsList);
      }
    } else {
      // 答对，从错词本移除
      const wrongWordsList = getWrongWords();
      const index = wrongWordsList.indexOf(currentWord.word);
      if (index > -1) {
        wrongWordsList.splice(index, 1);
        localStorage.setItem('gina_wrong_words', JSON.stringify(wrongWordsList));
        setWrongWords(wrongWordsList);
      }
    }
    
    handleNext();
  };

  const handleRemoveWrongWord = (word) => {
    const newWrongWords = wrongWords.filter(w => w !== word);
    setWrongWords(newWrongWords);
    localStorage.setItem('gina_wrong_words', JSON.stringify(newWrongWords));
  };

  const handleStudyWrongWords = () => {
    setStudyMode('wrong');
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleStudyNormal = () => {
    setStudyMode('normal');
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Gina 学英语</h1>
        <nav className="nav">
          <button 
            className={currentView === 'learn' ? 'active' : ''}
            onClick={() => setCurrentView('learn')}
          >
            背词
          </button>
          <button 
            className={currentView === 'wrong' ? 'active' : ''}
            onClick={() => setCurrentView('wrong')}
          >
            错词本 ({wrongWords.length})
          </button>
          <button 
            className={currentView === 'stats' ? 'active' : ''}
            onClick={() => setCurrentView('stats')}
          >
            统计
          </button>
        </nav>
      </header>

      <main className="main">
        {currentView === 'learn' && (
          <div className="learn-view">
            <div className="unit-selector">
              <select 
                value={currentUnit} 
                onChange={(e) => {
                  setCurrentUnit(Number(e.target.value));
                  setCurrentIndex(0);
                  setStudyMode('normal');
                }}
              >
                {units.map(unit => (
                  <option key={unit} value={unit}>Unit {unit}</option>
                ))}
              </select>
              {studyMode === 'wrong' && (
                <button className="btn-normal" onClick={handleStudyNormal}>
                  正常模式
                </button>
              )}
            </div>
            
            {currentWord ? (
              <Card
                word={currentWord}
                onFlip={handleFlip}
                onNext={handleNext}
                onPrev={handlePrev}
                currentIndex={currentIndex}
                total={currentWords.length}
              />
            ) : (
              <div className="empty-state">暂无单词</div>
            )}
            
            <div className="rate-buttons">
              <button className="rate-btn rate-1" onClick={() => handleRate(1)}>😢 不认识</button>
              <button className="rate-btn rate-2" onClick={() => handleRate(2)}>🤔 模糊</button>
              <button className="rate-btn rate-3" onClick={() => handleRate(3)}>😊 认识</button>
              <button className="rate-btn rate-4" onClick={() => handleRate(4)}>😄 轻松</button>
            </div>
          </div>
        )}

        {currentView === 'wrong' && (
          <div className="wrong-view">
            <WrongWordList
              words={wrongWords}
              onRemove={handleRemoveWrongWord}
              onStudy={handleStudyWrongWords}
            />
          </div>
        )}

        {currentView === 'stats' && (
          <div className="stats-view">
            <Stats stats={stats} />
          </div>
        )}
      </main>

      <footer className="footer">
        <p>Gina 学英语 · 沪教版二年级下册 · 学习工具</p>
      </footer>
    </div>
  );
}
