import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../styles/Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>📰 Новости дня</Link>
        </div>
        
        <nav className={`${styles.nav} ${isMenuOpen ? styles.active : ''}`}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link 
                to="/" 
                className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Главная
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link 
                to="/top-news" 
                className={`${styles.navLink} ${location.pathname === '/top-news' ? styles.active : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Главные новости
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link 
                to="/category/technology" 
                className={`${styles.navLink} ${location.pathname.includes('/category') ? styles.active : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                По категориям
              </Link>
            </li>
          </ul>
        </nav>
        
        <button 
          className={styles.menuButton} 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;