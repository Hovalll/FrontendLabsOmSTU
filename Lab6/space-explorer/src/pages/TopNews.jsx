import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NewsCard from '../components/NewsCard';
import LoadingSpinner from '../components/LoadingSpinner';
import SearchBar from '../components/SearchBar';
import newsService from '../services/newsService';
import styles from '../styles/TopNews.module.css';

const TopNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isDemoData, setIsDemoData] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        setIsDemoData(false);
        
        console.log(`Загрузка: ${searchQuery ? 'поиск' : 'новостей'}`);
        
        const data = await newsService.fetchNews(
          searchQuery ? 'search' : 'world',
          currentPage,
          searchQuery || ''
        );
        
        console.log('Данные получены:', data);
        
        if (data.articles && data.articles.length > 0) {
          setArticles(data.articles);
          setTotalResults(data.totalResults || data.articles.length);
          setTotalPages(data.pages || 1);
          setIsDemoData(data.isDemo || false);
          
          if (data.isDemo) {
            setError('Используются демо-данные. The Guardian API временно недоступен.');
          } else {
            setError(null);
          }
        } else {
          throw new Error('Нет новостей в ответе');
        }
        
      } catch (err) {
        console.error('Ошибка:', err);
        const demoData = newsService.getDemoData('world', searchQuery || '', currentPage);
        setArticles(demoData.articles);
        setTotalResults(demoData.totalResults);
        setTotalPages(demoData.pages);
        setIsDemoData(true);
        setError(`Используются демо-данные: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [searchQuery, currentPage]);

  const handleSearch = (query) => {
    navigate(`/top-news?q=${encodeURIComponent(query)}`);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const clearSearch = () => {
    navigate('/top-news');
    setCurrentPage(1);
  };

  return (
    <div className={styles.topNews}>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>
            {searchQuery ? `Поиск: "${searchQuery}"` : 'Главные новости мира'}
          </h1>
          <p className={styles.pageSubtitle}>
            {searchQuery 
              ? `Найдено новостей: ${totalResults.toLocaleString('ru-RU')}` 
              : 'Самые важные мировые новости от The Guardian'}
          </p>
          
          <div className={styles.apiInfoBox}>
            <div className={styles.apiStatus}>
              <span className={styles.apiIcon}>🔑</span>
              <span className={styles.apiText}>
                API ключ: {newsService.apiKey.substring(0, 8)}...
                {isDemoData && ' (демо-режим)'}
              </span>
            </div>
            {isDemoData && (
              <div className={styles.demoWarning}>
                ⚠️ Режим демонстрации. Настоящие новости загружаются при работе API.
              </div>
            )}
          </div>
          
          <div className={styles.searchBox}>
            <SearchBar onSearch={handleSearch} />
            <div className={styles.searchTips}>
              <span>Примеры: politics, technology, sport, business, culture</span>
            </div>
          </div>
        </div>

        {error && (
          <div className={styles.errorContainer}>
            <div className={styles.errorAlert}>
              <h3>⚠️ Информация</h3>
              <p>{error}</p>
              <p>Попробуйте обновить страницу или вернуться позже.</p>
              <div className={styles.errorActions}>
                <button 
                  onClick={() => window.location.reload()}
                  className={styles.retryButton}
                >
                  🔄 Обновить
                </button>
                {searchQuery && (
                  <button 
                    onClick={clearSearch}
                    className={styles.clearButton}
                  >
                    ✕ Очистить поиск
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <LoadingSpinner />
        ) : articles.length > 0 ? (
          <>
            <div className={styles.resultsInfo}>
              <div className={styles.resultsStats}>
                <span>Страница {currentPage} из {totalPages}</span>
                <span>Показано {articles.length} новостей</span>
                {searchQuery && (
                  <button 
                    onClick={clearSearch}
                    className={styles.clearSearchButton}
                  >
                    ✕ Очистить поиск
                  </button>
                )}
              </div>
            </div>

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
                  ← Предыдущая
                </button>
                
                <div className={styles.pageNumbers}>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
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
                  {totalPages > 5 && <span className={styles.pageDots}>...</span>}
                </div>
                
                <button 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={styles.pageButton}
                >
                  Следующая →
                </button>
              </div>
            )}
          </>
        ) : (
          <div className={styles.noResults}>
            <h2>Новости не найдены</h2>
            <p>Попробуйте изменить поисковый запрос или выбрать другую категорию</p>
            <div className={styles.noResultsActions}>
              <button 
                onClick={clearSearch}
                className={styles.backButton}
              >
                ← Вернуться к новостям
              </button>
              <Link to="/" className={styles.homeButton}>
                На главную
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Небольшие компоненты для навигации
const Link = ({ to, children, className }) => (
  <a href={to} className={className}>{children}</a>
);

export default TopNews;