import {
  Block, CoreRouter, renderDOM, Store,
} from 'core/index';
import pages from 'views';
import { StoreEvents } from 'core/Store/Store';
import { ERROR_TEMPLATE } from 'views/Error';

export enum Views {
  LOGIN = 'Login',
  REGISTER = 'Registration',
  MAIN = 'Main',
  ERROR = 'Error',
}

export enum Paths {
  LOGIN = '/',
  REGISTER = '/sign-up',
  MAIN = '/messenger',
  ERROR = '*',
}

const map: Record<string, typeof Block<any>> = {
  [Views.LOGIN]: pages.login,
  [Views.REGISTER]: pages.registration,
  [Views.MAIN]: pages.messenger,
  [Views.ERROR]: pages.error,
};

export const getViewComponent = (view: Views): typeof Block<any> => map[view];

const routes = [
  {
    path: Paths.LOGIN,
    block: Views.LOGIN,
    guest: true,
    auth: false,
  },
  {
    path: Paths.REGISTER,
    block: Views.REGISTER,
    guest: true,
    auth: false,
  },
  {
    path: Paths.MAIN,
    block: Views.MAIN,
    guest: false,
    auth: true,
  },
  {
    path: '*',
    guest: true,
    auth: true,
  },
];

export function initRouter(router: CoreRouter, store: Store<AppState>) {
  routes.forEach((route) => {
    router.use(route.path, () => {
      const isAuthorized = Boolean(store.getState().user);

      if (!route.block) {
        store.dispatch({ screen: Views.ERROR, error: ERROR_TEMPLATE['404'] });
        return;
      }

      if (isAuthorized && !route.auth) {
        router.go(Paths.MAIN);
        return;
      }

      if (isAuthorized || route.guest) {
        store.dispatch({ screen: route.block });
        return;
      }

      if (!isAuthorized && route.auth) {
        store.dispatch({ screen: Views.ERROR, error: ERROR_TEMPLATE['403'] });
        return;
      }

      store.dispatch({ screen: Views.ERROR, error: ERROR_TEMPLATE['418'] });
    });
  });

  store.on(StoreEvents.UPDATED, (prevState: AppState, nextState: AppState) => {
    if (!prevState.appIsInit && nextState.appIsInit) {
      router.start();
    }

    // prevState.screen = null
    // nextState.screen = null
    if (prevState.screen !== nextState.screen) {
      const Page = getViewComponent(nextState.screen!);
      renderDOM('#app', new Page({}));
      document.title = `App | ${nextState.screen}`;
    }
  });
}
