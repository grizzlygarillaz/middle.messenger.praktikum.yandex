import Chat from './Main';
import Login from './Authentication/Login';
import Registration from './Authentication/Registration';
import Error from './Error';
import Profile from './Profile';

const pages: Record<string, any> = {
  Chat,
  Login,
  Registration,
  Error,
  Profile,
};

export default pages;
