import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import { startI18n } from './shared/i18n/i18n';
import { logError } from './shared/services/logger';

const root = document.getElementById('root');
if (root === null) {
  throw new Error('The page has no element with the id "root".');
}

window.addEventListener('unhandledrejection', (event) => {
  logError('A promise was rejected and nothing handled it', event.reason);
});

function render(container: HTMLElement): void {
  createRoot(container, {
    onCaughtError: (error, info) =>
      logError('A part of the page failed and an error message was shown instead', error, {
        componentStack: info.componentStack,
      }),
    onUncaughtError: (error, info) =>
      logError('The page failed and nothing caught the error', error, {
        componentStack: info.componentStack,
      }),
  }).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

// The common texts are loaded before the first drawing, so no part of the page appears without its texts.
startI18n()
  .catch((error: unknown) => logError('The interface texts were not loaded', error))
  .finally(() => render(root));
