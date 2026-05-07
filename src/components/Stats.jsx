export default function Stats({ stats }) {
  return (
    <div className="stats">
      <div className="stat-item">
        <span className="stat-value">{stats.total}</span>
        <span className="stat-label">总词数</span>
      </div>
      <div className="stat-item">
        <span className="stat-value">{stats.learned}</span>
        <span className="stat-label">已学</span>
      </div>
      <div className="stat-item">
        <span className="stat-value">{stats.reviewing}</span>
        <span className="stat-label">复习中</span>
      </div>
      <div className="stat-item">
        <span className="stat-value">{stats.newWords}</span>
        <span className="stat-label">新词</span>
      </div>
    </div>
  );
}
