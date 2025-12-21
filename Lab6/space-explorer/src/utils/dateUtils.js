export const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (e) {
    return 'Дата неизвестна';
  }
};

export const timeAgo = (dateString) => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return 'только что';
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} мин назад`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} ч назад`;
    
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} дн назад`;
    
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} мес назад`;
    
    const years = Math.floor(months / 12);
    return `${years} год назад`;
  } catch (e) {
    return 'давно';
  }
};