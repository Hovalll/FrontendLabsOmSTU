import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import styles from '../styles/Apod.module.css';

const Apod = () => {
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // Демо-ключ API NASA (в реальном проекте нужно получить свой на api.nasa.gov)
  const API_KEY = 'DEMO_KEY';
  
  // Функция для получения данных с API
  const fetchApod = async (selectedDate = date) => {
    setLoading(true);
    setError(null);
    
    try {
      // REAL API CALL - раскомментируйте для реального запроса
      // const response = await fetch(
      //   `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${selectedDate}`
      // );
      
      // if (!response.ok) {
      //   throw new Error('Не удалось получить данные от NASA API');
      // }
      
      // const data = await response.json();
      // setApodData(data);
      
      // Имитация запроса к API с задержкой
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Мок-данные для демонстрации (если API недоступно)
      const mockData = {
        title: "Галактика Андромеды (M31)",
        date: selectedDate,
        explanation: "Галактика Андромеды, также известная как M31, является самой близкой к Млечному Пути большой галактикой. Она находится на расстоянии около 2,5 миллионов световых лет от Земли и содержит примерно триллион звезд. Это изображение показывает спиральную структуру галактики и ее яркое ядро. Галактика приближается к нам со скоростью около 110 км/с и через 4,5 миллиарда лет столкнется с Млечным Путем, образовав новую галактику.",
        url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1427&auto=format&fit=crop",
        media_type: "image",
        copyright: "NASA/ESA/Hubble"
      };
      
      setApodData(mockData);
      
    } catch (err) {
      setError(err.message);
      // Демо-данные в случае ошибки
      setApodData({
        title: "Туманность Ориона",
        date: selectedDate,
        explanation: "Туманность Ориона — это диффузная туманность, расположенная в созвездии Ориона. Она является одной из самых ярких туманностей и видна невооруженным глазом на ночном небе. Туманность находится на расстоянии около 1,344 световых лет от Земли и имеет диаметр около 24 световых лет. Это область активного звездообразования, где рождаются новые звезды.",
        url: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?q=80&w=1471&auto=format&fit=crop",
        media_type: "image",
        copyright: "NASA/ESA"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApod();
  }, []);

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
    fetchApod(newDate);
  };

  const handleRandomDate = () => {
    // Генерация случайной даты за последний год
    const today = new Date();
    const pastDate = new Date();
    pastDate.setDate(today.getDate() - Math.floor(Math.random() * 365));
    const randomDate = pastDate.toISOString().split('T')[0];
    
    setDate(randomDate);
    fetchApod(randomDate);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className={styles.apod}>
      <h1 className={styles.title}>Астрономическое фото дня (APOD)</h1>
      
      <div className={styles.controls}>
        <div className={styles.dateControl}>
          <label htmlFor="apod-date">Выберите дату:</label>
          <input 
            type="date" 
            id="apod-date" 
            value={date} 
            onChange={handleDateChange}
            max={new Date().toISOString().split('T')[0]}
            min="1995-06-16"
            className={styles.dateInput}
          />
        </div>
        <button onClick={handleRandomDate} className="btn">
          Случайная дата
        </button>
      </div>

      {error && <ErrorMessage message={error} />}

      {apodData && (
        <div className={styles.apodCard}>
          <div className={styles.apodHeader}>
            <h2>{apodData.title}</h2>
            <p className={styles.apodDate}>{apodData.date}</p>
            {apodData.copyright && (
              <p className={styles.copyright}>Автор: {apodData.copyright}</p>
            )}
          </div>
          
          <div className={styles.mediaContainer}>
            <img 
              src={apodData.url} 
              alt={apodData.title} 
              className={styles.apodImage}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1427&auto=format&fit=crop";
              }}
            />
          </div>
          
          <div className={styles.apodExplanation}>
            <h3>Описание изображения:</h3>
            <p>{apodData.explanation}</p>
          </div>
        </div>
      )}
      
      <div className={styles.apiInfo}>
        <h3>Информация об API</h3>
        <p>
          <strong>NASA Astronomy Picture of the Day (APOD) API</strong> предоставляет 
          доступ к астрономическим изображениям с описаниями. Каждый день публикуется 
          новое изображение космоса с пояснениями профессионального астронома.
        </p>
        <p>
          <strong>Для лабораторной работы используется демо-ключ.</strong> В реальном 
          приложении необходимо получить собственный ключ на 
          <a href="https://api.nasa.gov/" target="_blank" rel="noopener noreferrer"> api.nasa.gov</a>.
        </p>
      </div>
    </div>
  );
};

export default Apod;