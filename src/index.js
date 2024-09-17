import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from '../src/app/App';
import reportWebVitals from './reportWebVitals';
import './18n';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
