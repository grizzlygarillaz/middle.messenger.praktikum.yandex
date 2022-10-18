import Block from 'core/Block';
import store, { StoreEvents } from 'core/Store';
import { isEqual } from './helpers';

function withStore(mapStateProps: (state: any) => any) {
  return function wrap(Component: typeof Block): typeof Block<any> {
    let previousState: any;

    return class WithStore extends Component<any> {
      constructor(props: any) {
        previousState = mapStateProps(store.getState());

        super({ ...props, ...previousState });

        store.on(StoreEvents.UPDATED, () => {
          const stateProps = mapStateProps(store.getState());

          if (isEqual(previousState, stateProps)) {
            return;
          }

          previousState = stateProps;

          this.setProps({ ...stateProps });
        });
      }
    };
  };
}

export default withStore;