import React from 'react';
import { Container } from 'react-bootstrap';
import Navbar from './ui/Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <Container>
      <Navbar />
      <Outlet />
    </Container>
  );
}
