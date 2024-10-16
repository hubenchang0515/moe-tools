import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/english/translation.json';
import translationZH from './locales/chinese/translation.json';

i18n.use(initReactI18next).init({
  resources: {
      english: {
          translation: translationEN,
      },
      chinese: {
          translation: translationZH,
      }
  },
  lng: navigator.language === 'zh-CN' ? 'chinese' : 'english',
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
