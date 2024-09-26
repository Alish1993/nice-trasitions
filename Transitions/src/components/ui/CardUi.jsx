import React from 'react';
import './../styles/Card.css'; // Подключаем CSS файл

export default function CardUi({ post }) {
  return (
    <div className="card">
      {post.img ? (
        <img src={post.img} alt={post.title} className="card-img" />
      ) : (
        <div className="placeholder" />
      )}
    </div>
  );
}
