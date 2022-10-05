import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App';
import { store, StoreContext } from './stores/store';
import { BrowserRouter } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <StoreContext.Provider value={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreContext.Provider>,
);
