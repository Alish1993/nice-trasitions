import React, { useState, useEffect } from 'react';
import './../styles/Multer.css';

export default function Multer({ onClose }) {
  const [files, setFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]); // Добавляем состояние для загруженных изображений
  const [title, setTitle] = useState('');
  const [img, setImg] = useState('');
  const [uploadMethod, setUploadMethod] = useState('multer');

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);

    if (uploadMethod === 'multer') {
      files.forEach((file) => formData.append('photos', file));
    } else {
      formData.append('img', img);
    }

    try {
      const response = await fetch('/api/post/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        setFiles([]); // Очищаем файлы после успешной загрузки
        if (data.imagePaths) {
          setUploadedImages(data.imagePaths); // Обновляем состояние загруженных изображений
        }
        onClose();
      } else {
        alert('Ошибка при загрузке файлов');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при загрузке файлов');
    }
  };

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file));
    };
  }, [files]);

  return (
    <div className="modal-background">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>Загрузите фотографии</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="uploadMethod" className="modal-label">
            Выберите способ загрузки:
          </label>
          <select
            id="uploadMethod"
            value={uploadMethod}
            onChange={(e) => setUploadMethod(e.target.value)}
            className="modal-input"
          >
            <option value="multer">Загрузить через Multer</option>
            <option value="url">Загрузить через URL</option>
          </select>

          {uploadMethod === 'multer' ? (
            <>
              <label htmlFor="fileUpload" className="modal-label">
                Выберите фотографии для загрузки:
              </label>
              <input
                type="file"
                id="fileUpload"
                multiple
                onChange={handleFileUpload}
                className="modal-input"
                accept="image/*"
              />
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
            </>
          ) : (
            <>
              <label htmlFor="img" className="modal-label">
                Введите URL изображения:
              </label>
              <input
                type="text"
                id="img"
                value={img}
                onChange={(e) => setImg(e.target.value)}
                className="modal-input"
                required
              />
            </>
          )}

          <label htmlFor="title" className="modal-label">
            Заголовок:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="modal-input"
            required
          />

          <button type="submit" className="submit-button">
            Загрузить фотографии
          </button>
        </form>

        {/* Отображение загруженных изображений */}
        <div className="photo-gallery">
          {uploadedImages.length > 0 ? (
            uploadedImages.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Uploaded ${index}`}
                className="uploaded-image"
              />
            ))
          ) : (
            <p>Нет загруженных фотографий.</p>
          )}
        </div>
      </div>
    </div>
  );
}
