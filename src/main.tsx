import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Suppress browser extension errors that we can't control
window.addEventListener('unhandledrejection', (event) => {
  // Check if error is from browser extension (common pattern)
  if (event.reason?.message?.includes('message channel closed') ||
      event.reason?.message?.includes('Extension context invalidated')) {
    event.preventDefault();
    // Silently ignore browser extension errors
    return;
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
