import React from 'react';
import './../styles/Navbar.css';

function Navbars() {
  return (
    <>
      <header className="header">
        <a href="/" className="logo">
          Main
        </a>
        <nav className="Navbar">
          <a href="/">Home</a>
          <a href="/post">Post</a>
          <a href="/contact">Contact</a>
          <a href="/services">Services</a>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </nav>
      </header>
    </>
  );
}

export default Navbars;
