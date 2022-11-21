import { ProfileModal } from 'components/index';
import { renderBlock, step } from 'tests/renderBlock';
import { getByTestId } from '@testing-library/dom';
import { Views } from '../../../router';

const USER_MOCK = {
  id: 1,
  login: 'user_login',
  firstName: 'Name',
  secondName: 'Second_name',
  avatar: '/path/to/avatar.png',
  displayName: 'Name Second_name',
  email: 'second_name@example.com',
  phone: '89123456780',
};

describe('pages/Modals/Profile', () => {
  it('should logout from profile', async () => {
    await step('render profile page', () => {
      renderBlock({
        Block: ProfileModal,
        props: {},
        state: {
          screen: Views.MAIN,
          appIsInit: true,
          user: USER_MOCK,
        },
      });
    });

    await step('logout from profile', () => {
      const button = getByTestId(document.body, 'logout_trigger');
      button.click();
    });
    console.log(window.store.getState());

    await step('check user state', async () => {
      expect(window.store.getState().user).toEqual(null);
    });
  });
});
