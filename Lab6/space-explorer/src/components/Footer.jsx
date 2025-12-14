import React from 'react';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>Космический Эксплорер</h3>
            <p>Исследуйте космос с NASA API</p>
            <p>Лабораторная работа №6</p>
          </div>
          <div className={styles.footerSection}>
            <h4>Источники данных</h4>
            <p>Данные предоставлены NASA Open APIs</p>
            <a href="https://api.nasa.gov/" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
              API NASA
            </a>
          </div>
          <div className={styles.footerSection}>
            <h4>Разработчики</h4>
            <p>Студенческая группа</p>
            <p>React проект</p>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; {currentYear} Космический Эксплорер. Учебный проект.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;