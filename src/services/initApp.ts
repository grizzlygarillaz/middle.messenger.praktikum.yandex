import { Dispatch } from 'core/Store/Store';
import authAPI from 'api/AuthAPI';
import { objectToCamelCase } from 'utils/helpers';

export default async function initApp(dispatch: Dispatch<AppState>) {
  try {
    const user = await authAPI.read();

    console.log(user);

    dispatch({ user: objectToCamelCase(user) as User });
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ appIsInit: true });
  }
}
