import React from 'react';
import styles from '../styles/About.module.css';

const About = () => {
  const teamMembers = [
    {
      name: 'Алексей Иванов',
      role: 'Frontend разработчик',
      tasks: ['Архитектура приложения', 'React Router', 'API интеграция', 'Главная страница'],
      skills: ['React', 'JavaScript', 'CSS', 'API']
    },
    {
      name: 'Мария Петрова',
      role: 'UI/UX дизайнер',
      tasks: ['Дизайн интерфейса', 'Адаптивная верстка', 'Стилизация', 'Пользовательский опыт'],
      skills: ['Figma', 'CSS Modules', 'Responsive Design', 'UI/UX']
    },
    {
      name: 'Дмитрий Сидоров',
      role: 'Backend интегратор',
      tasks: ['Работа с NASA API', 'Обработка данных', 'Обработка ошибок', 'Оптимизация'],
      skills: ['API Integration', 'Data Processing', 'Error Handling', 'Performance']
    }
  ];

  const projectFeatures = [
    '4 страницы с навигацией (React Router)',
    'Интеграция с NASA API (Astronomy Picture of the Day)',
    'Адаптивный дизайн для мобильных устройств',
    'CSS Modules для изоляции стилей',
    'Компонентная архитектура (Header, Footer, переиспользуемые компоненты)',
    'Обработка состояний загрузки и ошибок',
    'Демонстрация работы с внешними API'
  ];

  const technologies = [
    { name: 'React 18', purpose: 'Библиотека для построения пользовательских интерфейсов' },
    { name: 'React Router v6', purpose: 'Навигация между страницами в SPA' },
    { name: 'NASA Open API', purpose: 'Источник данных о космосе и астрономии' },
    { name: 'CSS Modules', purpose: 'Локальная область видимости для стилей' },
    { name: 'Fetch API', purpose: 'Выполнение HTTP-запросов к внешним API' },
    { name: 'Responsive Web Design', purpose: 'Адаптация интерфейса под разные устройства' }
  ];

  return (
    <div className={styles.about}>
      <h1 className={styles.title}>О проекте</h1>
      
      <section className={styles.projectOverview}>
        <h2>Космический Эксплорер</h2>
        <p className={styles.projectDescription}>
          Веб-приложение разработано в рамках лабораторной работы №6 по дисциплине 
          "Разработка веб-приложений". Основная цель проекта — создание современного 
          одностраничного приложения (SPA) на React с интеграцией внешнего API.
        </p>
        
        <div className={styles.objectives}>
          <h3>Цели проекта:</h3>
          <ul>
            <li>Реализовать многостраничное приложение с использованием React Router</li>
            <li>Интегрировать внешнее API (NASA Open API) для получения реальных данных</li>
            <li>Создать адаптивный дизайн, работающий на всех устройствах</li>
            <li>Разработать модульную архитектуру с переиспользуемыми компонентами</li>
            <li>Реализовать обработку состояний загрузки и ошибок</li>
            <li>Продемонстрировать работу с современными инструментами веб-разработки</li>
          </ul>
        </div>
      </section>

      <section className={styles.featuresSection}>
        <h2>Реализованные возможности</h2>
        <div className={styles.featuresGrid}>
          {projectFeatures.map((feature, index) => (
            <div key={index} className={styles.featureItem}>
              <span className={styles.checkmark}>✓</span>
              {feature}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.teamSection}>
        <h2>Команда разработчиков</h2>
        <div className={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <div key={index} className={styles.teamCard}>
              <div className={styles.memberAvatar}>
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h3>{member.name}</h3>
              <p className={styles.memberRole}>{member.role}</p>
              
              <div className={styles.memberTasks}>
                <h4>Задачи:</h4>
                <ul>
                  {member.tasks.map((task, idx) => (
                    <li key={idx}>{task}</li>
                  ))}
                </ul>
              </div>
              
              <div className={styles.memberSkills}>
                <h4>Навыки:</h4>
                <div className={styles.skillsList}>
                  {member.skills.map((skill, idx) => (
                    <span key={idx} className={styles.skillTag}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.techSection}>
        <h2>Используемые технологии</h2>
        <div className={styles.techGrid}>
          {technologies.map((tech, index) => (
            <div key={index} className={styles.techCard}>
              <h3>{tech.name}</h3>
              <p>{tech.purpose}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.apiSection}>
        <h2>NASA API Интеграция</h2>
        <div className={styles.apiInfo}>
          <p>
            Приложение использует официальное <strong>NASA Open API</strong> для получения данных. 
            Основной используемый endpoint — <code>Astronomy Picture of the Day (APOD)</code>.
          </p>
          
          <div className={styles.apiExample}>
            <h4>Пример API запроса:</h4>
            <pre className={styles.codeBlock}>
{`fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2024-01-01')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // {
    //   "title": "Галактика Андромеды",
    //   "explanation": "...",
    //   "url": "https://apod.nasa.gov/apod/image/...",
    //   "media_type": "image",
    //   "date": "2024-01-01"
    // }
  });`}
            </pre>
          </div>
          
          <div className={styles.apiLinks}>
            <a href="https://api.nasa.gov/" target="_blank" rel="noopener noreferrer" className="btn">
              Документация NASA API
            </a>
            <a href="https://github.com/nasa/apod-api" target="_blank" rel="noopener noreferrer" className={`btn ${styles.secondaryBtn}`}>
              Примеры использования
            </a>
          </div>
        </div>
      </section>

      <section className={styles.conclusion}>
        <h2>Результаты работы</h2>
        <p>
          В результате выполнения лабораторной работы было разработано полнофункциональное 
          веб-приложение, демонстрирующее современные подходы к разработке на React. 
          Приложение соответствует всем требованиям задания и готово к использованию.
        </p>
        
        <div className={styles.requirementsCheck}>
          <h3>Выполненные требования:</h3>
          <div className={styles.requirementsList}>
            <div className={styles.requirement}><span>✓</span> Не менее 3-х страниц</div>
            <div className={styles.requirement}><span>✓</span> Fetch запрос к API</div>
            <div className={styles.requirement}><span>✓</span> CSS Modules</div>
            <div className={styles.requirement}><span>✓</span> Разделение на компоненты</div>
            <div className={styles.requirement}><span>✓</span> Адаптивность</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;