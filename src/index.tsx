import React from 'react';
import { Provider } from 'react-redux';
import { translations } from './translation';
import { TranslationProvider } from 'i18nano';
import { createRoot } from 'react-dom/client';
import { store } from 'store/store';
import App from './App';
import './index.scss';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <TranslationProvider translations={translations.home} language={'ru'} fallback="ru">
        <App />
      </TranslationProvider>
    </Provider>
  </React.StrictMode>
);
