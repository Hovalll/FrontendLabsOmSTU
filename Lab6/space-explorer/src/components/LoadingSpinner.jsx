import React from 'react';
import styles from '../styles/TopNews.module.css';

const LoadingSpinner = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p>Загрузка новостей...</p>
    </div>
  );
};

export default LoadingSpinner;