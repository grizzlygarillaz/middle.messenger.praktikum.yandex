import * as components from 'components';
import './style.sass';
import registerComponent from 'core/registerComponent';
import defaultState from 'core/Store';
import { PathRouter, Store } from 'core';
import initApp from 'services/initApp';
import Input from 'components/Input';
import Trigger from 'components/Trigger';
import { initRouter } from './router';

Object.values(components).forEach((Component: any) => {
  registerComponent(Component);
});
registerComponent(Input);
registerComponent(Trigger);

window.addEventListener('DOMContentLoaded', async () => {
  const store = new Store<AppState>(defaultState);
  const router = new PathRouter();
  /**
   * Помещаем роутер и стор в глобальную область для доступа в хоках with*
   * @warning Не использовать такой способ на реальный проектах
   */
  window.router = router;
  window.store = store;

  initRouter(router, store);
  //
  store.dispatch(initApp);
});
