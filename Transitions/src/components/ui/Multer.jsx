import React, { useState } from 'react';
import './../styles/Multer.css';

export default function Multer({ onClose, submithandler }) {
  const [files, setFiles] = useState([]);

  // Обработка загрузки файлов
  const handleFileUpload = (event) => {
    const uploadedFiles = event.target.files;
    setFiles([...files, ...uploadedFiles]);
  };

  // Отправка файлов на сервер
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    files.forEach((file) => formData.append('photos', file));
  
    try {
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const message = await response.text();  // Ожидаем текстовый ответ
        alert(message);  // Выводим сообщение от сервера
      } else {
        alert('Ошибка при загрузке файлов');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при загрузке файлов');
    }
  };

  return (
    <div className="modal-background">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>Загрузите фотографии</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fileUpload" className="modal-label">
            Выберите фотографии для загрузки:
          </label>
          <input
            type="file"
            id="fileUpload"
            multiple
            onChange={handleFileUpload}
            className="modal-input"
          />
          <button type="submit" className="submit-button">
            Загрузить фотографии
          </button>
        </form>
        <div className="photo-gallery">
          {files.length > 0 ? (
            files.map((file, index) => (
              <div key={index}>
                <img
                  src={URL.createObjectURL(file)}
                  alt={`uploaded ${index}`}
                  className="uploaded-image"
                />
              </div>
            ))
          ) : (
            <p>Нет загруженных фотографий.</p>
          )}
        </div>
      </div>
    </div>
  );
}
