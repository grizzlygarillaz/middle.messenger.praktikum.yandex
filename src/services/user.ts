import { Dispatch } from 'core/Store/Store';
import userAPI, { UserUpdatePasswordData } from 'api/UserAPI';
import authAPI from 'api/AuthAPI';
import { objectToCamelCase } from 'utils/helpers';

export interface UpdateUserData {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string,
  avatar: FormData | null,
  oldPassword: string | null,
  newPassword: string | null
}

export const updateUser = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  data: UpdateUserData,
) => {
  try {
    const password = (({ oldPassword, newPassword }) => ({ oldPassword, newPassword }))(data);
    const profile = (({
      first_name, second_name, display_name, login, email, phone,
    }) => ({
      first_name, second_name, display_name, login, email, phone,
    }))(data);

    await userAPI.updateProfile(profile);

    if (data.avatar) {
      await userAPI.updateAvatar(data.avatar);
    }

    if (password.oldPassword && password.newPassword) {
      await userAPI.updatePassword(password as UserUpdatePasswordData);
    }

    const user = objectToCamelCase(await authAPI.read()) as User;

    dispatch({ user });

    alert('Данные обновлены');
  } catch (err) {
    console.error(err);

    dispatch({ error: err.reason });
  }
};
