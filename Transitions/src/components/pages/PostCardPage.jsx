import React, { useEffect, useState } from 'react';
import '../styles/PostCardPage.css'; // Импортируйте файл стилей
import CardUi from '../ui/CardUi';
import Multer from '../ui/Multer';

export default function PostCardPage() {
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/post')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Ошибка загрузки постов');
        }
        return res.json();
      })
      .then((data) => {
        setPosts(data);
      });
  }, []);

  const submithandler = async (formData) => {
    try {
      const response = await fetch('/api/upload', {
        // убедитесь, что это правильный путь
        method: 'POST',
        body: formData, // отправляем FormData
      });
      const data = await response.json();
      setPosts((prev) => [data, ...prev]); // обновляем состояние постов
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <div className="button">
        <button className="butt" onClick={() => setOpen(true)}>
          add a post
        </button>
        {open && <Multer onClose={() => setOpen(false)} submithandler={submithandler} />}
      </div>
      <div className="post">
        {posts.map((post) => (
          <CardUi key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}
