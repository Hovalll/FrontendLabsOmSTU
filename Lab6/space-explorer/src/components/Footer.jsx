import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <a href="#top" className={styles.backToTop} onClick={scrollToTop} aria-label="Наверх">
        ↑
      </a>
      
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>📰 Новости дня</h3>
            <p className={styles.footerText}>
              Все самые свежие новости в одном месте. Будьте в курсе событий со всего мира!
            </p>
            
            <div className={styles.newsletter}>
              <h4 className={styles.newsletterTitle}>Подписка на новости</h4>
              <form className={styles.newsletterForm}>
                <input
                  type="email"
                  placeholder="Ваш email"
                  className={styles.newsletterInput}
                  required
                />
                <button type="submit" className={styles.newsletterButton}>
                  Подписаться
                </button>
              </form>
            </div>
          </div>
          
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Быстрые ссылки</h3>
            <ul className={styles.footerLinks}>
              <li><RouterLink to="/">Главная</RouterLink></li>
              <li><RouterLink to="/top-news">Главные новости</RouterLink></li>
              <li><RouterLink to="/category/technology">Технологии</RouterLink></li>
              <li><RouterLink to="/category/business">Бизнес</RouterLink></li>
              <li><RouterLink to="/category/sports">Спорт</RouterLink></li>
              <li><RouterLink to="/category/entertainment">Развлечения</RouterLink></li>
            </ul>
            
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink} aria-label="Twitter">𝕏</a>
              <a href="#" className={styles.socialLink} aria-label="Telegram">✈️</a>
              <a href="#" className={styles.socialLink} aria-label="VK">VK</a>
              <a href="#" className={styles.socialLink} aria-label="GitHub">🐙</a>
            </div>
          </div>
          
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Контакты</h3>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📧</span>
                <span>news@app.com</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📱</span>
                <span>+7 (999) 123-45-67</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>🏢</span>
                <span>Москва, ул. Примерная, 123</span>
              </div>
            </div>
            
            <p className={styles.footerText}>
              Данные предоставляются через NewsAPI.org
            </p>
            
            <a 
              href="https://newsapi.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.apiLink}
            >
              🔗 Перейти к NewsAPI
            </a>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} Новости дня. Все права защищены.
          </p>
          <p>Лабораторная работа по React • Разработка веб-приложений</p>
          <div className={styles.apiCredits}>
            <p>
              Используется <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer">NewsAPI.org</a> 
              • Бесплатный тариф (100 запросов/день)
            </p>
          </div>
        </div>
      </div>
      
      <div className={styles.footerWave}>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                fill="rgba(59, 130, 246, 0.1)"></path>
        </svg>
      </div>
    </footer>
  );
};

export default Footer;