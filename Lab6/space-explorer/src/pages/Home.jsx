import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import newsService from '../services/newsService';
import LoadingSpinner from '../components/LoadingSpinner';
import styles from '../styles/Home.module.css';

const Home = () => {
  const [topHeadlines, setTopHeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiStatus, setApiStatus] = useState('Загружаем...');

  const categories = newsService.getCategories();

  useEffect(() => {
    const fetchTopNews = async () => {
      try {
        setLoading(true);
        setApiStatus('Подключаемся к The Guardian API...');
        
        console.log('Загрузка главных новостей...');
        const data = await newsService.fetchNews('world', 1);
        
        console.log('Получены данные:', data);
        
        if (data.articles && data.articles.length > 0) {
          setTopHeadlines(data.articles.slice(0, 6));
          setError(null);
          setApiStatus(`The Guardian API работает ✓ (${data.articles.length} новостей)`);
        } else {
          throw new Error('Нет новостей в ответе');
        }
        
      } catch (err) {
        console.error('Ошибка загрузки новостей:', err.message);
        const demoData = newsService.getDemoData('world', '', 1);
        setTopHeadlines(demoData.articles.slice(0, 6));
        setError(`Используются демо-данные: ${err.message}`);
        setApiStatus('API временно недоступен, используем демо-данные');
      } finally {
        setLoading(false);
      }
    };

    fetchTopNews();
  }, []);

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>The Guardian News</h1>
          <p className={styles.heroSubtitle}>
            Самые свежие новости от одного из самых уважаемых мировых изданий
          </p>
          <div className={styles.apiStatus}>
            <span className={`${styles.statusIndicator} ${error ? styles.statusError : styles.statusSuccess}`}></span>
            <span>{apiStatus}</span>
          </div>
          <Link to="/top-news" className={styles.heroButton}>
            Читать новости →
          </Link>
        </div>
      </section>

      <section className={styles.latestNews}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Последние новости</h2>
          
          {error && (
            <div className={styles.errorAlert}>
              <p>⚠️ {error}</p>
              <p>Приложение показывает демо-данные. Настоящие новости появятся при восстановлении доступа к API.</p>
            </div>
          )}

          {loading ? (
            <div className={styles.loadingSection}>
              <LoadingSpinner />
              <p>Загружаем новости от The Guardian...</p>
            </div>
          ) : (
            <>
              <div className={styles.newsGrid}>
                {topHeadlines.map((article, index) => (
                  <div key={index} className={styles.newsPreview}>
                    <div className={styles.imageWrapper}>
                      <img 
                        src={article.urlToImage} 
                        alt={article.title}
                        className={styles.previewImage}
                        onError={(e) => {
                          e.target.src = newsService.getRandomImage(index);
                        }}
                      />
                      <span className={styles.categoryBadge}>
                        {article.category || 'Новости'}
                      </span>
                    </div>
                    <div className={styles.previewContent}>
                      <h3>{article.title}</h3>
                      <p>{article.description}</p>
                      <div className={styles.previewMeta}>
                        <div className={styles.authorInfo}>
                          <span className={styles.authorIcon}>👤</span>
                          <span>{article.author}</span>
                        </div>
                        <span className={styles.date}>
                          {new Date(article.publishedAt).toLocaleDateString('ru-RU', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                        <a 
                          href={article.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={styles.readMore}
                        >
                          Читать на The Guardian →
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className={styles.apiInfo}>
                <p><strong>API ключ:</strong> {newsService.apiKey.substring(0, 15)}...</p>
                <p><strong>Источник:</strong> The Guardian Open Platform</p>
                <p><strong>Лимиты:</strong> 5000 запросов/день, 12 запросов/секунду</p>
              </div>
            </>
          )}
        </div>
      </section>

      <section className={styles.categories}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Категории новостей</h2>
          <p className={styles.sectionSubtitle}>
            Выберите интересующую вас категорию для просмотра новостей
          </p>
          <div className={styles.categoriesGrid}>
            {categories.map(category => (
              <Link 
                key={category.id} 
                to={`/category/${category.id}`}
                className={styles.categoryCard}
              >
                <div className={styles.categoryIcon}>{category.icon}</div>
                <h3>{category.name}</h3>
                <p>Актуальные новости от The Guardian</p>
                <span className={styles.categoryArrow}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Почему The Guardian?</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🏆</div>
              <h3>Премиальное качество</h3>
              <p>Одно из самых уважаемых изданий в мире с 1821 года</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🌍</div>
              <h3>Глобальное покрытие</h3>
              <p>Новости со всего мира на разных языках</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>⚖️</div>
              <h3>Независимая журналистика</h3>
              <p>Объективное и проверенное освещение событий</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;