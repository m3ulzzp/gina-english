// localStorage 存储封装

const STORAGE_KEYS = {
  PROGRESS: 'gina_progress',
  WRONG_WORDS: 'gina_wrong_words',
  SETTINGS: 'gina_settings'
};

/**
 * 获取学习进度
 */
export function getProgress() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    console.error('Failed to load progress:', e);
    return {};
  }
}

/**
 * 保存学习进度
 */
export function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress:', e);
  }
}

/**
 * 获取错词本
 */
export function getWrongWords() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.WRONG_WORDS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to load wrong words:', e);
    return [];
  }
}

/**
 * 添加到错词本
 */
export function addToWrongWords(word) {
  const wrongWords = getWrongWords();
  const index = wrongWords.indexOf(word);
  if (index === -1) {
    wrongWords.push(word);
    localStorage.setItem(STORAGE_KEYS.WRONG_WORDS, JSON.stringify(wrongWords));
  }
}

/**
 * 从错词本移除
 */
export function removeFromWrongWords(word) {
  const wrongWords = getWrongWords();
  const index = wrongWords.indexOf(word);
  if (index > -1) {
    wrongWords.splice(index, 1);
    localStorage.setItem(STORAGE_KEYS.WRONG_WORDS, JSON.stringify(wrongWords));
  }
}

/**
 * 重置所有数据
 */
export function resetAll() {
  localStorage.removeItem(STORAGE_KEYS.PROGRESS);
  localStorage.removeItem(STORAGE_KEYS.WRONG_WORDS);
  localStorage.removeItem(STORAGE_KEYS.SETTINGS);
}
