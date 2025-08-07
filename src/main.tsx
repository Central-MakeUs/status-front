import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeMockServiceWorker } from '@/mocks';
import App from '@/App.tsx';
import '@/scss/global.scss';

if (import.meta.env.DEV) {
  await initializeMockServiceWorker();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
