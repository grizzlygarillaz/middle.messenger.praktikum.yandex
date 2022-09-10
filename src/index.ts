import './components/components';
import './style.sass';
import pages from './views/views';
import { arrowBack } from './img/icons';

window.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app')!;

  const pagePath = window
    .location
    .pathname
    .replace(/^\/|\/$/, '')
    .replace(/\//, '.');

  const pageName = pagePath[0].toUpperCase() + pagePath.slice(1);

  let page;

  if (pages.hasOwnProperty(pageName)) {
    page = new pages[pageName]();
  } else {
    page = new pages.Error({
      code: 404,
      message: 'Страница не найдена',
      arrowIcon: arrowBack,
    });
  }

  app.append(page.getContent());
});
