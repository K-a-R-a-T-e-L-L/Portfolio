import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from '../src/app/App';
import reportWebVitals from './reportWebVitals';
import './18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  // </React.StrictMode>
);

reportWebVitals();
