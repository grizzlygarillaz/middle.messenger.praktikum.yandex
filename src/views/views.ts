import chat from './Main';
import login from './Authentication/Login';
import registration from './Authentication/Registration';
import error from './Error';
import profile from './Profile';

const pages: Record<string, any> = {
  chat,
  login,
  registration,
  error,
  profile,
};

export default pages;
