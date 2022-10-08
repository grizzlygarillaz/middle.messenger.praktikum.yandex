import Store from './util/Store/Store';

declare global {
  interface Window {
    store: typeof Store;
  }
}

window.store = Store;
