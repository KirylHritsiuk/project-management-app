import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App/App';
import './index.scss';
import { HashRouter } from 'react-router-dom';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <HashRouter>
      {/* <Provider store={store}> */}
      <App />
      {/* </Provider> */}
    </HashRouter>
  </React.StrictMode>
);
