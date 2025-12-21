import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import NewsCard from '../components/NewsCard';
import LoadingSpinner from '../components/LoadingSpinner';
import newsService from '../services/newsService';
import styles from '../styles/CategoryNews.module.css';

const CategoryNews = () => {
  const { category } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDemoData, setIsDemoData] = useState(false);
  const [filter, setFilter] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const categories = newsService.getCategories();
  const currentCategory = categories.find(c => c.id === category) || 
                         { id: category, name: category.charAt(0).toUpperCase() + category.slice(1), icon: '📰' };

  useEffect(() => {
    const fetchCategoryNews = async () => {
      try {
        setLoading(true);
        setError(null);
        setIsDemoData(false);
        
        console.log(`Загрузка категории: ${category}`);
        const guardianSection = newsService.getSectionForCategory(category);
        console.log(`Guardian section: ${guardianSection}`);
        
        const data = await newsService.fetchNews(guardianSection, currentPage, '');
        
        console.log('Данные получены:', data);
        
        if (data.articles && data.articles.length > 0) {
          // Применяем фильтр
          let filteredArticles = [...data.articles];
          if (filter === 'oldest') {
            filteredArticles.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
          }
          
          setArticles(filteredArticles);
          setTotalPages(data.pages || 1);
          setIsDemoData(data.isDemo || false);
          
          if (data.isDemo) {
            setError('Используются демо-данные. The Guardian API временно недоступен.');
          }
        } else {
          throw new Error('Нет новостей в категории');
        }
        
      } catch (err) {
        console.error('Ошибка загрузки:', err);
        const demoData = newsService.getDemoData(category, '', currentPage);
        setArticles(demoData.articles);
        setTotalPages(demoData.pages);
        setIsDemoData(true);
        setError(`Используются демо-данные: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryNews();
  }, [category, filter, currentPage]);

  const otherCategories = categories
    .filter(cat => cat.id !== category)
    .slice(0, 6);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.categoryNews}>
      <div className={styles.container}>
        <div className={styles.categoryHeader}>
          <div className={styles.categoryInfo}>
            <span className={styles.categoryIcon}>
              {currentCategory.icon}
            </span>
            <div className={styles.categoryText}>
              <h1 className={styles.pageTitle}>
                {currentCategory.name}
              </h1>
              <p className={styles.pageSubtitle}>
                Новости категории от The Guardian
              </p>
            </div>
          </div>
          
          <div className={styles.categoryStats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{articles.length}</span>
              <span className={styles.statLabel}>новостей</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{currentPage}</span>
              <span className={styles.statLabel}>страница</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statIcon}>
                {isDemoData ? '🔄' : '✅'}
              </span>
              <span className={styles.statLabel}>
                {isDemoData ? 'Демо-режим' : 'API работает'}
              </span>
            </div>
          </div>
        </div>

        {error && (
          <div className={styles.errorContainer}>
            <div className={styles.errorMessage}>
              <h3>⚠️ Информация</h3>
              <p>{error}</p>
              <p>Приложение показывает демо-данные для тестирования интерфейса.</p>
            </div>
          </div>
        )}

        <div className={styles.controls}>
          <div className={styles.newsFilter}>
            <h4 className={styles.filterTitle}>Сортировка:</h4>
            <div className={styles.filterOptions}>
              <button 
                className={`${styles.filterButton} ${filter === 'latest' ? styles.active : ''}`}
                onClick={() => setFilter('latest')}
              >
                🕒 Сначала новые
              </button>
              <button 
                className={`${styles.filterButton} ${filter === 'oldest' ? styles.active : ''}`}
                onClick={() => setFilter('oldest')}
              >
                📅 Сначала старые
              </button>
            </div>
          </div>

          <div className={styles.apiInfo}>
            <div className={styles.apiKeyInfo}>
              <span className={styles.apiLabel}>API ключ:</span>
              <code className={styles.apiKey}>
                {newsService.apiKey.substring(0, 12)}...
              </code>
            </div>
          </div>
        </div>

        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Загружаем новости категории "{currentCategory.name}"...</p>
          </div>
        ) : articles.length > 0 ? (
          <>
            <div className={styles.newsGrid}>
              {articles.map((article, index) => (
                <NewsCard key={index} article={article} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className={styles.pagination}>
                <button 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={styles.pageButton}
                >
                  ← Назад
                </button>
                
                <div className={styles.pageNumbers}>
                  {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                    const pageNum = currentPage <= 2 ? i + 1 : currentPage - 1 + i;
                    if (pageNum > totalPages) return null;
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`${styles.pageNumber} ${currentPage === pageNum ? styles.active : ''}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={styles.pageButton}
                >
                  Вперед →
                </button>
              </div>
            )}

            <div className={styles.otherCategories}>
              <h3 className={styles.categoriesTitle}>Другие категории</h3>
              <div className={styles.categoriesList}>
                {otherCategories.map(cat => (
                  <Link 
                    key={cat.id} 
                    to={`/category/${cat.id}`}
                    className={styles.categoryLink}
                  >
                    <span className={styles.linkIcon}>{cat.icon}</span>
                    <span className={styles.linkText}>{cat.name}</span>
                    <span className={styles.linkArrow}>→</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className={styles.apiDetails}>
              <h4>Информация о The Guardian API</h4>
              <div className={styles.apiGrid}>
                <div className={styles.apiDetail}>
                  <span className={styles.detailIcon}>🔑</span>
                  <div>
                    <strong>Ваш ключ:</strong>
                    <code>{newsService.apiKey.substring(0, 20)}...</code>
                  </div>
                </div>
                <div className={styles.apiDetail}>
                  <span className={styles.detailIcon}>📊</span>
                  <div>
                    <strong>Лимиты:</strong>
                    <span>5000 запросов/день</span>
                  </div>
                </div>
                <div className={styles.apiDetail}>
                  <span className={styles.detailIcon}>⚡</span>
                  <div>
                    <strong>Скорость:</strong>
                    <span>12 запросов/секунду</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.noResults}>
            <div className={styles.noResultsIcon}>📭</div>
            <h2>Новости не найдены</h2>
            <p>В категории "{currentCategory.name}" пока нет новостей. Попробуйте выбрать другую категорию.</p>
            <div className={styles.noResultsActions}>
              <Link to="/" className={styles.backLink}>
                ← На главную
              </Link>
              <Link to="/top-news" className={styles.newsLink}>
                К новостям →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryNews;