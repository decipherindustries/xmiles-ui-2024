import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import { NextUIProvider } from "@nextui-org/react";

import './assets/fonts/formular.css';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </React.StrictMode>
);
