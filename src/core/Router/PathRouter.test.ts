import { PathRouter } from 'core/index';

describe('core/Router/PathRouter', () => {
  const router = new PathRouter();
  const mock = jest.fn((page) => page);

  router
    .use('/', () => mock('Home'))
    .use('/login', () => mock('Login'))
    .use('/chats', () => mock('Chats'))
    .start();

  beforeEach(() => {
    window.location.replace('/');
  });

  it('should change state of history API', () => {
    router.go('/');

    router.go('/login');

    expect(window.history.length).toEqual(3);
  });

  it('should change page', () => {
    router.go('/login');

    expect(mock).toHaveReturnedWith('Login');

    router.go('/');

    expect(mock).toHaveReturnedWith('Homes');
  });
});
