import { Block } from 'core/index';
import messenger from 'views/Main';
import login from 'views/Authentication/Login';
import registration from 'views/Authentication/Registration';
import error from 'views/Error';

const pages: Record<string, typeof Block<any>> = {
  messenger,
  login,
  registration,
  error,
};

export default pages;
