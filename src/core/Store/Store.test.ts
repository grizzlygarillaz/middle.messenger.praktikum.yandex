import Store, { StoreEvents } from './Store';

describe('core/Store/Store', () => {
  it('should set state', () => {
    const store = new Store({});

    store.set({ userId: 1 });

    expect(store.getState()).toEqual({ userId: 1 });
  });

  it('should remove exist state', () => {
    const store = new Store({ userId: 12, 'test-value': 'tester', null: null });

    store.forget('test-value');

    expect(store.getState()).toEqual({ userId: 12, null: null });

    // @ts-ignore
    store.forget('test');

    expect(store.getState()).toEqual({ userId: 12, null: null });

    store.forget('userId', 'null');

    expect(store.getState()).toEqual({});
  });

  it('should update store if passed different state', () => {
    const store = new Store({ userId: 12, page: 'login' });
    const mock = jest.fn();

    store.on(StoreEvents.UPDATED, mock);

    store.dispatch({ userId: 12, page: 'login' });

    expect(mock).not.toHaveBeenCalled();

    store.dispatch({ userId: 12, page: 'main' });

    expect(mock).toHaveBeenCalledWith({ userId: 12, page: 'login' }, { userId: 12, page: 'main' });
  });
});
