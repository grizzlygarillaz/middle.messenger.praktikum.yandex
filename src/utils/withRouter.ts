import Block from 'core/Block';
import CoreRouter from 'core/Router/CoreRouter';

interface PropsWithRouter {
  router: CoreRouter,
}

function withRouter(Component: typeof Block<any>): typeof Block<any> {
  type Props = typeof Component extends typeof Block<infer P extends Record<string, any>> ? P : any;

  return class extends Component {
    constructor(props: Props & PropsWithRouter) {
      super({ ...props, router: window.router });
    }
  };
}

export { withRouter, PropsWithRouter };
