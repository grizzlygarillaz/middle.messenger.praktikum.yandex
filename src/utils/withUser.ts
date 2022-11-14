import { Block } from 'core/index';
import { StoreEvents } from 'core/Store/Store';
import { isEqual } from './helpers';

type WithUserProps = { user: User | null };

export default function withUser<P extends WithUserProps>(Wrapper: typeof Block<P>) {
  // @ts-expect-error No base constructor has the specified
  return class extends Wrapper<P> {
    public static componentName = Wrapper.name;

    constructor(props: P) {
      super({ ...props, user: window.store.getState().user });
    }

    __onChangeUserCallback = (prevState: AppState, nextState: AppState) => {
      if (!isEqual(prevState, nextState)) {
        // @ts-expect-error this is not typed
        this.setProps({ ...this.props, user: nextState.user });
      }
    };

    componentDidMount(props: P) {
      super.componentDidMount(props);
      window.store.on(StoreEvents.UPDATED, this.__onChangeUserCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off(StoreEvents.UPDATED, this.__onChangeUserCallback);
    }
  } as typeof Block<Omit<P, 'user'>>;
}
