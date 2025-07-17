// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Use createRoot for React 18+
import './index.css'; // You can create this file for global styles, or remove if not needed
import App from './App'; // Import your main App component

// Add soft glowing cursor with trailing effect
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    // Main glowing cursor
    let cursor = document.createElement('div');
    cursor.id = 'wand-cursor';
    document.body.appendChild(cursor);
    // Trailing glow
    let trail = document.createElement('div');
    trail.id = 'wand-cursor-trail';
    document.body.appendChild(trail);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let trailX = mouseX;
    let trailY = mouseY;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.opacity = '0.95';
      trail.style.opacity = '0.5';
    });
    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      trail.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '0.95';
      trail.style.opacity = '0.5';
    });

    function animate() {
      // Main cursor follows mouse closely
      cursorX += (mouseX - cursorX) * 0.25;
      cursorY += (mouseY - cursorY) * 0.25;
      cursor.style.transform = `translate3d(${cursorX - 16}px, ${cursorY - 16}px, 0)`;
      // Trail lags behind more and is larger
      trailX += (mouseX - trailX) * 0.12;
      trailY += (mouseY - trailY) * 0.12;
      trail.style.transform = `translate3d(${trailX - 32}px, ${trailY - 32}px, 0)`;
      requestAnimationFrame(animate);
    }
    animate();
  });
}

// Get the root element from public/index.html
const rootElement = document.getElementById('root');

// Create a root for React 18 and render the App component
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// import reportWebVitals from './reportWebVitals';
// reportWebVitals();