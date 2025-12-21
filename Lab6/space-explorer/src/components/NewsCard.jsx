import React from 'react';
import { timeAgo } from '../utils/dateUtils';
import styles from '../styles/NewsCard.module.css';

const NewsCard = ({ article }) => {
  const defaultImage = 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
  
  const handleImageError = (e) => {
    e.target.src = defaultImage;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className={styles.newsCard}>
      <div className={styles.imageContainer}>
        <img 
          src={article.urlToImage || defaultImage} 
          alt={article.title}
          className={styles.image}
          onError={handleImageError}
          loading="lazy"
        />
        <div className={styles.imageOverlay}>
          <span className={styles.sourceBadge}>
            {article.source?.name || 'The Guardian'}
          </span>
          {article.category && (
            <span className={styles.categoryBadge}>
              {article.category}
            </span>
          )}
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.date}>
            📅 {formatDate(article.publishedAt)}
          </span>
          <span className={styles.time}>
            ⏱️ {timeAgo(article.publishedAt)}
          </span>
        </div>
        
        <h3 className={styles.title}>{article.title}</h3>
        
        <p className={styles.description}>
          {article.description || 'Описание отсутствует'}
        </p>
        
        {article.author && article.author !== 'The Guardian' && (
          <div className={styles.author}>
            <span className={styles.authorIcon}>👤</span>
            <span>{article.author}</span>
          </div>
        )}
        
        <div className={styles.actions}>
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.readButton}
          >
            📖 Читать на The Guardian
          </a>
          <div className={styles.secondaryActions}>
            <button className={styles.saveButton} title="Сохранить">
              💾
            </button>
            <button className={styles.shareButton} title="Поделиться">
              🔗
            </button>
          </div>
        </div>
        
        {article.tags && article.tags.length > 0 && (
          <div className={styles.tags}>
            {article.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className={styles.tag}>
                #{tag.title}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsCard;