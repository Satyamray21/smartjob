import React, { StrictMode, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './reduxStore/store';
import FadeLoader from 'react-spinners/FadeLoader';
import { Box } from '@mui/material';

const App = lazy(() => import('./App'));

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <Provider store={store}>
      <Suspense fallback={<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100wh' }}><FadeLoader color='#f51234' /></Box>}>
        <App />
      </Suspense>
    </Provider>
  </StrictMode>
);

reportWebVitals(console.log);
