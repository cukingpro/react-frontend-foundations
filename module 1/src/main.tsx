import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { API_BASE_URL } from './constants/config';
import './styles/global.css';

if (import.meta.env.DEV)
  console.info('[Module 1] VITE_API_BASE_URL:', API_BASE_URL);
const root = document.getElementById('root');
if (!root) throw new Error('Không tìm thấy phần tử #root.');
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
