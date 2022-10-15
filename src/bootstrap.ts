import Store from './core/Store';

declare global {
  interface Window {
    store: typeof Store;
  }
}

window.store = Store;
