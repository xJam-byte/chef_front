import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">Страница не найдена</p>
      <Link to="/" className="not-found-link">Вернуться на главную</Link>
    </div>
  );
};

export default NotFoundPage;
