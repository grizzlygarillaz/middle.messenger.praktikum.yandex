import { Block, Store } from 'core/index';
import { StoreEvents } from 'core/Store/Store';
import { isEqual } from './helpers';

type WithStateProps = { store: Store<AppState> };

export function withStore<P extends WithStateProps>(WrappedBlock: typeof Block) {
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName ?? WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, store: window.store });
    }

    __onChangeStoreCallback = (prevState: AppState, nextState: AppState) => {
      if (isEqual(prevState, nextState)) {
        return;
      }
      this.setProps({ store: window.store });
    };

    componentDidMount(props: P) {
      super.componentDidMount(props);
      window.store.on(StoreEvents.UPDATED, this.__onChangeStoreCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off(StoreEvents.UPDATED, this.__onChangeStoreCallback);
    }
  } as typeof Block<Omit<P, 'store'>>;
}

export default withStore;
