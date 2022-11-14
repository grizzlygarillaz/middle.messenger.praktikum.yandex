import { ProfileModal } from 'components/index';
import { Views } from 'router';
import { renderBlock, step } from 'tests/renderBlock';
import { getByTestId } from '@testing-library/dom';

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
      getByTestId(document.body, 'logout_trigger').click();
    });

    await step('check user state', async () => {
      expect(window.store.getState().user).toEqual(null);
    });
  });
});
