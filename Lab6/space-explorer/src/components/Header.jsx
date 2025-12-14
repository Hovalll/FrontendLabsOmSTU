import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Header.module.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/" className={styles.logoLink}>
            <span className={styles.logoIcon}>🚀</span>
            <h1>Космический Эксплорер</h1>
          </Link>
        </div>
        
        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          <ul className={styles.navList}>
            <li><Link to="/" className={styles.navLink} onClick={() => setMenuOpen(false)}>Главная</Link></li>
            <li><Link to="/apod" className={styles.navLink} onClick={() => setMenuOpen(false)}>Фото дня</Link></li>
            <li><Link to="/mars-rovers" className={styles.navLink} onClick={() => setMenuOpen(false)}>Марсоходы</Link></li>
            <li><Link to="/about" className={styles.navLink} onClick={() => setMenuOpen(false)}>О проекте</Link></li>
          </ul>
        </nav>
        
        <button 
          className={styles.menuToggle} 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Меню"
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