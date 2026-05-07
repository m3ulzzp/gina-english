import { useState, useEffect } from 'react';

export default function Card({ word, onFlip, onNext, onPrev, currentIndex, total }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showMeaning, setShowMeaning] = useState(false);

  useEffect(() => {
    setIsFlipped(false);
    setShowMeaning(false);
  }, [word.word]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setShowMeaning(!showMeaning);
    onFlip(word.word);
  };

  const speak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word.word);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <span className="progress">{currentIndex + 1} / {total}</span>
        <button className="speak-btn" onClick={speak}>🔊</button>
      </div>
      
      <div className="card-content" onClick={handleFlip}>
        {isFlipped ? (
          <div className="card-back">
            <h2>{word.word}</h2>
            <p className="phonetic">{word.phonetic}</p>
            <p className="pos">{word.pos}</p>
            <p className="meaning">{word.meaning}</p>
            <p className="example">{word.example}</p>
          </div>
        ) : (
          <div className="card-front">
            <h2>{word.word}</h2>
            <p className="phonetic">{word.phonetic}</p>
            <p className="hint">点击翻转</p>
          </div>
        )}
      </div>
      
      <div className="card-footer">
        <button className="btn-prev" onClick={onPrev}>← 上一个</button>
        <button className="btn-next" onClick={onNext}>下一个 →</button>
      </div>
    </div>
  );
}
