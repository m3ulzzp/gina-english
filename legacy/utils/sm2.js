// SM-2 复习算法实现

/**
 * 计算下次复习时间
 * @param {Object} progress - 当前进度数据
 * @param {number} quality - 用户评分 (0-5)
 * @returns {Object} 更新后的进度
 */
export function calculateNextReview(progress, quality) {
  const { easeFactor, interval, repetitions } = progress;
  
  // 质量评分转换
  const qualityScore = Math.max(0, Math.min(5, quality));
  
  // 更新难度系数
  let newEaseFactor = easeFactor + (0.1 - (5 - qualityScore) * (0.08 + (5 - qualityScore) * 0.02));
  newEaseFactor = Math.max(1.3, newEaseFactor);
  
  // 计算新间隔
  let newInterval;
  if (qualityScore < 3) {
    // 答错，重置
    newInterval = 0;
    repetitions = 0;
  } else {
    if (repetitions === 0) {
      newInterval = 1;
    } else if (repetitions === 1) {
      newInterval = 6;
    } else {
      newInterval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  }
  
  // 计算下次复习时间戳
  const nextReview = newInterval > 0 
    ? new Date(Date.now() + newInterval * 24 * 60 * 60 * 1000).toISOString()
    : null;
  
  return {
    ...progress,
    easeFactor: newEaseFactor,
    interval: newInterval,
    repetitions,
    nextReview,
    lastReview: new Date().toISOString()
  };
}

/**
 * 获取需要复习的单词
 * @param {Array} words - 所有单词
 * @param {Object} progressMap - 进度映射
 * @returns {Array} 需要复习的单词
 */
export function getReviewWords(words, progressMap) {
  const now = new Date();
  return words.filter(word => {
    const progress = progressMap[word.word];
    if (!progress || !progress.nextReview) return true;
    return new Date(progress.nextReview) <= now;
  });
}

/**
 * 获取统计数据
 * @param {Object} progressMap - 进度映射
 * @returns {Object} 统计信息
 */
export function getStats(progressMap) {
  const total = Object.keys(progressMap).length;
  const learned = Object.values(progressMap).filter(p => p.repetitions > 0).length;
  const reviewing = Object.values(progressMap).filter(p => p.interval > 0).length;
  const newWords = total - learned;
  
  return { total, learned, reviewing, newWords };
}
