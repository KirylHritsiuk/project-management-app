import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App/App';
import './index.scss';
import { HashRouter } from 'react-router-dom';
import { translations } from './tranlation';
import { TranslationProvider } from 'i18nano';
import { CircularProgress } from '@mui/material';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <HashRouter>
      <Suspense fallback={<CircularProgress />}>
        {/* <Provider store={store}> */}
        <TranslationProvider translations={translations.home} language={'en'} fallback="en">
          <App />
        </TranslationProvider>
        {/* </Provider> */}
      </Suspense>
    </HashRouter>
  </React.StrictMode>
);
