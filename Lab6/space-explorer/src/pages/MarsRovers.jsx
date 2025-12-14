import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import styles from '../styles/MarsRovers.module.css';

const MarsRovers = () => {
  const [selectedRover, setSelectedRover] = useState('curiosity');
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);

  const roverInfo = {
    curiosity: {
      name: 'Curiosity',
      launchDate: '26 ноября 2011',
      landingDate: '6 августа 2012',
      status: 'Активен',
      missionDuration: 'Более 10 лет',
      description: 'Марсоход Curiosity исследует кратер Гейла на Марсе с целью определить, была ли планета когда-либо пригодна для жизни. Оснащен множеством научных инструментов для анализа почвы и атмосферы.',
      instruments: ['Камеры (17)', 'Спектрометры', 'Детектор радиации', 'Метеостанция']
    },
    opportunity: {
      name: 'Opportunity',
      launchDate: '7 июля 2003',
      landingDate: '25 января 2004',
      status: 'Завершил миссию',
      missionDuration: '14 лет 136 дней',
      description: 'Opportunity проработал на Марсе более 14 лет, превысив запланированную миссию на 90 дней. Сделал важные открытия о наличии воды на Марсе в прошлом.',
      instruments: ['Панорамные камеры', 'Спектрометры', 'Магнитометр', 'Микроскоп']
    },
    spirit: {
      name: 'Spirit',
      launchDate: '10 июня 2003',
      landingDate: '4 января 2004',
      status: 'Завершил миссию',
      missionDuration: '6 лет 77 дней',
      description: 'Spirit работал на Марсе до 2011 года. Обнаружил доказательства того, что в прошлом Марс был более влажным и теплым, с условиями, потенциально пригодными для жизни.',
      instruments: ['Панорамные камеры', 'Спектрометры', 'Бурильный инструмент', 'Микроскоп']
    }
  };

  // Мок-фотографии для демонстрации
  const mockPhotos = {
    curiosity: [
      { id: 1, img_src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1472&auto=format&fit=crop', earth_date: '2023-10-15', camera: 'MAST' },
      { id: 2, img_src: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?q=80&w=1471&auto=format&fit=crop', earth_date: '2023-10-14', camera: 'NAVCAM' },
      { id: 3, img_src: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1427&auto=format&fit=crop', earth_date: '2023-10-13', camera: 'FHAZ' },
      { id: 4, img_src: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?q=80&w=1470&auto=format&fit=crop', earth_date: '2023-10-12', camera: 'RHAZ' },
    ],
    opportunity: [
      { id: 5, img_src: 'https://images.unsplash.com/photo-1465101162946-4377e57745c3?q=80&w=1478&auto=format&fit=crop', earth_date: '2018-06-10', camera: 'PANCAM' },
      { id: 6, img_src: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=1474&auto=format&fit=crop', earth_date: '2018-06-09', camera: 'NAVCAM' },
    ],
    spirit: [
      { id: 7, img_src: 'https://images.unsplash.com/photo-1501862700950-18382cd41497?q=80&w=1419&auto=format&fit=crop', earth_date: '2010-05-20', camera: 'PANCAM' },
      { id: 8, img_src: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1427&auto=format&fit=crop', earth_date: '2010-05-19', camera: 'NAVCAM' },
    ]
  };

  useEffect(() => {
    // Имитация загрузки данных
    setLoading(true);
    setTimeout(() => {
      setPhotos(mockPhotos[selectedRover] || []);
      setLoading(false);
    }, 500);
  }, [selectedRover]);

  const rover = roverInfo[selectedRover];

  return (
    <div className={styles.marsRovers}>
      <h1 className={styles.title}>Марсоходы NASA</h1>
      
      <div className={styles.roverSelector}>
        {Object.keys(roverInfo).map(roverKey => (
          <button
            key={roverKey}
            className={`${styles.roverTab} ${selectedRover === roverKey ? styles.active : ''}`}
            onClick={() => setSelectedRover(roverKey)}
          >
            {roverInfo[roverKey].name}
          </button>
        ))}
      </div>

      <div className={styles.roverInfoCard}>
        <div className={styles.roverDetails}>
          <h2>{rover.name}</h2>
          
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Дата запуска:</span>
              <span className={styles.statValue}>{rover.launchDate}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Дата посадки:</span>
              <span className={styles.statValue}>{rover.landingDate}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Статус:</span>
              <span className={`${styles.statValue} ${rover.status === 'Активен' ? styles.activeStatus : styles.inactiveStatus}`}>
                {rover.status}
              </span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Длительность миссии:</span>
              <span className={styles.statValue}>{rover.missionDuration}</span>
            </div>
          </div>
          
          <p className={styles.description}>{rover.description}</p>
          
          <div className={styles.instruments}>
            <h3>Научные инструменты:</h3>
            <div className={styles.instrumentList}>
              {rover.instruments.map((instrument, index) => (
                <span key={index} className={styles.instrumentTag}>{instrument}</span>
              ))}
            </div>
          </div>
        </div>
        
        <div className={styles.roverImage}>
          <div className={styles.imagePlaceholder}>
            <span className={styles.roverEmoji}>🤖</span>
            <p>Марсоход {rover.name}</p>
          </div>
        </div>
      </div>

      <div className={styles.photosSection}>
        <h2>Фотографии с поверхности Марса</h2>
        
        {loading ? (
          <LoadingSpinner />
        ) : photos.length > 0 ? (
          <>
            <div className={styles.photosGrid}>
              {photos.map(photo => (
                <div key={photo.id} className={styles.photoCard}>
                  <div className={styles.photoContainer}>
                    <img 
                      src={photo.img_src} 
                      alt={`Марс, ${photo.earth_date}`}
                      className={styles.photo}
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1427&auto=format&fit=crop";
                      }}
                    />
                  </div>
                  <div className={styles.photoInfo}>
                    <p className={styles.photoDate}>Дата: {photo.earth_date}</p>
                    <p className={styles.photoCamera}>Камера: {photo.camera}</p>
                    <p className={styles.photoRover}>Марсоход: {rover.name}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className={styles.photoNote}>
              * Демонстрационные изображения. В реальном приложении используются фотографии с 
              <a href="https://api.nasa.gov/" target="_blank" rel="noopener noreferrer"> NASA Mars Rover Photos API</a>.
            </p>
          </>
        ) : (
          <p className={styles.noPhotos}>Нет доступных фотографий для этого марсохода</p>
        )}
      </div>
    </div>
  );
};

export default MarsRovers;