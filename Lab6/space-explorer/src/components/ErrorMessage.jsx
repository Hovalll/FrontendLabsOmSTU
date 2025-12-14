import React from 'react';

const ErrorMessage = ({ message = 'Произошла ошибка при загрузке данных' }) => {
  return (
    <div className="error-message">
      <div className="error-icon">⚠️</div>
      <h3>Ошибка</h3>
      <p>{message}</p>
      <p className="error-note">Используются демонстрационные данные</p>
      <style>{`
        .error-message {
          background: rgba(244, 113, 116, 0.1);
          border: 1px solid #f47174;
          border-radius: 10px;
          padding: 25px;
          margin: 30px 0;
          color: #f47174;
          text-align: center;
        }
        
        .error-icon {
          font-size: 2.5rem;
          margin-bottom: 15px;
        }
        
        .error-message h3 {
          margin-bottom: 10px;
          color: #f47174;
        }
        
        .error-message p {
          margin-bottom: 10px;
          line-height: 1.6;
        }
        
        .error-note {
          margin-top: 15px;
          font-size: 0.9rem;
          color: #b8d4e3;
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default ErrorMessage;