import React from 'react';
import '../index.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Загрузка данных...</p>
      <style>{`
        .loading-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 300px;
          gap: 20px;
        }
        
        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 5px solid rgba(76, 201, 240, 0.3);
          border-top: 5px solid #4cc9f0;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .loading-container p {
          color: #b8d4e3;
          font-size: 1.2rem;
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;