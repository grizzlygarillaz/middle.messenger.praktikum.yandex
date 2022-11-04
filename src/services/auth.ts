import { Dispatch } from 'core/Store/Store';
import authAPI, { SignInData, SignUpData } from 'api/AuthAPI';
import { objectToCamelCase } from 'util/helpers';
import { Paths } from '../router';

export const logout = async (dispatch: Dispatch<AppState>) => {
  await authAPI.delete();

  dispatch({ user: null });

  window.router.go(Paths.LOGIN);
};

export const register = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  data: SignUpData,
) => {
  try {
    await authAPI.create(data);

    const user = objectToCamelCase(await authAPI.read()) as User;

    dispatch({ user });

    window.router.go(Paths.MAIN);
  } catch (err) {
    console.error(err);

    dispatch({ error: err.reason });
  }
};

export const login = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  data: SignInData,
) => {
  try {
    await authAPI.store(data);

    const user = await authAPI.read();

    dispatch({ user: objectToCamelCase(user) as User });

    window.router.go(Paths.MAIN);
  } catch (err) {
    console.error(err);

    dispatch({ error: err.reason });
  }
};
