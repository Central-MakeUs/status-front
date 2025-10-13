import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeMockServiceWorker } from '@/app/mocks';
import { App } from '@/app';
import '@/app/styles/global.scss';

if (import.meta.env.DEV && import.meta.env.VITE_API_MOCKING === 'true') {
  await initializeMockServiceWorker();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
