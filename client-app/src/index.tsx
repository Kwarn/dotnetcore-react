import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App';
import { store, StoreContext } from './stores/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>,
);
