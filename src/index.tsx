import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { translations } from './tranlation';
import { TranslationProvider } from 'i18nano';
import { createRoot } from 'react-dom/client';
import { store } from 'store/store';
import App from 'App/App';
import './index.scss';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <TranslationProvider translations={translations.home} language={'en'} fallback="en">
          <App />
        </TranslationProvider>
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
