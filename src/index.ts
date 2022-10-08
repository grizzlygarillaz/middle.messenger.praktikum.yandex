import './components/components';
import './style.sass';
import './bootstrap';
import Router from './util/Router/Router';
import pages from './views/views';
import AuthController from './controllers/AuthController';
import store from './util/Store/Store';

enum Routes {
  LOGIN = '/',
  REGISTER = '/register',
  MAIN = '/messenger',
}

window.addEventListener('DOMContentLoaded', async () => {
  Router
    .use('/', pages.login)
    .use('/registration', pages.registration)
    .use('/messenger', pages.chat)
    .start();

  let protectedRoute = true;

  switch (window.location.pathname) {
    case Routes.LOGIN:
    case Routes.REGISTER:
      protectedRoute = false;
      break;
    default:
  }
  // const user = AuthController.read();
  //
  // console.log(user.then());
  try {
    await AuthController.read();

    if (!protectedRoute) {
      Router.go(Routes.MAIN);
    }
  } catch (e) {
    if (!protectedRoute) {
      Router.go(Routes.LOGIN);
    }
  }

  console.log(store.getState());
});
