import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Home.module.css';

const Home = () => {
  const features = [
    {
      title: "Астрономическое фото дня",
      description: "Каждый день новое захватывающее изображение нашей вселенной с описанием от NASA",
      link: "/apod",
      icon: "🪐"
    },
    {
      title: "Марсоходы NASA",
      description: "Исследуйте Марс через объективы марсоходов Curiosity, Opportunity и Spirit",
      link: "/mars-rovers",
      icon: "🤖"
    },
    {
      title: "Космические факты",
      description: "Узнайте интересные факты о космосе, планетах и миссиях NASA",
      link: "/about",
      icon: "📚"
    }
  ];

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Исследуйте Вселенную с NASA</h1>
          <p className={styles.heroSubtitle}>
            Откройте для себя удивительные изображения космоса, данные с марсоходов 
            и последние космические открытия через официальное NASA API
          </p>
          <Link to="/apod" className="btn">
            Начать исследование
          </Link>
        </div>
      </section>

      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Возможности приложения</h2>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <Link to={feature.link} className={styles.featureLink}>
                Узнать больше →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.aboutPreview}>
        <h2 className={styles.sectionTitle}>О проекте</h2>
        <p>
          Это веб-приложение разработано в рамках лабораторной работы по React. 
          Мы используем официальное NASA API для получения актуальных данных о космосе, 
          включая астрономическое фото дня и фотографии с марсоходов.
        </p>
        <Link to="/about" className="btn">
          О команде
        </Link>
      </section>
    </div>
  );
};

export default Home;