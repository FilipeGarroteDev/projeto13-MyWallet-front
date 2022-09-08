/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './Components/App/App';

const container = document.querySelector('.root');
const root = createRoot(container);

root.render(<App />);
