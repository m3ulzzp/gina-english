export default function WrongWordList({ words, onRemove, onStudy }) {
  if (words.length === 0) {
    return <div className="wrong-word-empty">暂无错词，太棒了！</div>;
  }

  return (
    <div className="wrong-word-list">
      <h3>错词本 ({words.length})</h3>
      <ul>
        {words.map((word, index) => (
          <li key={index} className="wrong-word-item">
            <span className="word">{word.word}</span>
            <span className="meaning">{word.meaning}</span>
            <button className="btn-remove" onClick={() => onRemove(word)}>
              ✓ 已掌握
            </button>
          </li>
        ))}
      </ul>
      <button className="btn-study" onClick={onStudy}>
        复习错词
      </button>
    </div>
  );
}
