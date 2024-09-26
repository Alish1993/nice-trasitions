import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import MainPage from './components/pages/MainPage';
import PostCardPage from './components/pages/PostCardPage';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <MainPage />,
        },
        {
          path: '/post',
          element: <PostCardPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
