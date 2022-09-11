import './components/components';
import './style.sass';
import pages from './views/views';
import { arrowBack } from './img/icons';

window.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app')!;

  let pagePath = window
    .location
    .pathname
    .replace(/^\/|\/$/, '')
    .replace(/\//, '.');

  let page;

  if (!pagePath) {
    pagePath = 'login';
    window.location.href = '/login';
  }

  if (pages.hasOwnProperty(pagePath)) {
    page = new pages[pagePath ?? 'login']();
  } else {
    page = new pages.Error({
      code: 404,
      message: 'Страница не найдена',
      arrowIcon: arrowBack,
    });
  }

  app.append(page.getContent());
});
