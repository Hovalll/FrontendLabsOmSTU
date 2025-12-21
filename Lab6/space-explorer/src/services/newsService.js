import API_CONFIG from '../config/api';

class NewsService {
  constructor() {
    this.apiKey = API_CONFIG.API_KEY;
    this.baseUrl = API_CONFIG.BASE_URL;
  }

  async fetchNews(section = 'news', page = 1, query = '') {
    try {
      console.log('Используем The Guardian API с ключом:', this.apiKey.substring(0, 10) + '...');
      
      let url;
      if (query) {
        // Поиск новостей
        url = `${this.baseUrl}/search?q=${encodeURIComponent(query)}&page=${page}&page-size=${API_CONFIG.DEFAULT_PAGE_SIZE}&show-fields=thumbnail,trailText,byline&show-tags=keyword&api-key=${this.apiKey}`;
      } else {
        // Новости по категории
        url = `${this.baseUrl}/${section}?page=${page}&page-size=${API_CONFIG.DEFAULT_PAGE_SIZE}&show-fields=thumbnail,trailText,byline&show-tags=keyword&api-key=${this.apiKey}`;
      }
      
      console.log('Запрос к URL:', url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ошибка: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Ответ от The Guardian:', data);
      
      if (!data.response || !data.response.results) {
        throw new Error('Некорректный ответ от API');
      }
      
      return this.transformGuardianData(data);
      
    } catch (error) {
      console.error('Ошибка The Guardian API:', error);
      // Возвращаем демо-данные в случае ошибки
      return this.getDemoData(section, query, page);
    }
  }

  transformGuardianData(data) {
    const articles = data.response.results.map(item => ({
      title: item.webTitle,
      description: item.fields?.trailText || 'Описание отсутствует',
      url: item.webUrl,
      urlToImage: item.fields?.thumbnail || this.getRandomImage(),
      publishedAt: item.webPublicationDate,
      source: { name: 'The Guardian' },
      author: item.fields?.byline || 'The Guardian',
      category: item.sectionName || 'news',
      tags: item.tags || []
    }));

    return {
      articles: articles,
      totalResults: data.response.total || articles.length,
      currentPage: data.response.currentPage || 1,
      pages: data.response.pages || 1
    };
  }

  getDemoData(section, query, page) {
    const categories = {
      technology: 'Технологии',
      business: 'Бизнес',
      sports: 'Спорт',
      entertainment: 'Развлечения',
      health: 'Здоровье',
      science: 'Наука',
      news: 'Новости',
      politics: 'Политика',
      culture: 'Культура',
      world: 'Мир',
      uk: 'Великобритания',
      us: 'США'
    };

    const categoryName = categories[section] || section;
    const queryText = query ? ` по запросу "${query}"` : '';

    const articles = Array(API_CONFIG.DEFAULT_PAGE_SIZE).fill().map((_, i) => ({
      title: `${categoryName}${queryText} - Новость ${(page - 1) * API_CONFIG.DEFAULT_PAGE_SIZE + i + 1}`,
      description: `Это демонстрационная новость из категории "${categoryName}". Здесь будет интересное описание актуальной новости. ${queryText ? `Тема поиска: ${query}` : ''}`,
      url: '#',
      urlToImage: this.getRandomImage(i),
      publishedAt: new Date(Date.now() - i * 3600000).toISOString(),
      source: { name: 'The Guardian' },
      author: `Автор ${i + 1}`,
      category: section,
      tags: [{ title: categoryName }, { title: 'новости' }]
    }));

    return {
      articles: articles,
      totalResults: 1000,
      currentPage: page,
      pages: 50,
      isDemo: true
    };
  }

  getRandomImage(index = 0) {
    const images = [
      'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    ];
    return images[index % images.length];
  }

  getCategories() {
    return [
      { id: 'news', name: 'Главные новости', icon: '📰', guardianSection: 'world' },
      { id: 'politics', name: 'Политика', icon: '🏛️', guardianSection: 'politics' },
      { id: 'technology', name: 'Технологии', icon: '💻', guardianSection: 'technology' },
      { id: 'business', name: 'Бизнес', icon: '💼', guardianSection: 'business' },
      { id: 'sports', name: 'Спорт', icon: '⚽', guardianSection: 'sport' },
      { id: 'culture', name: 'Культура', icon: '🎭', guardianSection: 'culture' },
      { id: 'lifestyle', name: 'Образ жизни', icon: '🌿', guardianSection: 'lifeandstyle' },
      { id: 'science', name: 'Наука', icon: '🔬', guardianSection: 'science' }
    ];
  }

  getSectionForCategory(categoryId) {
    const category = this.getCategories().find(c => c.id === categoryId);
    return category ? category.guardianSection : categoryId;
  }
}

export default new NewsService();