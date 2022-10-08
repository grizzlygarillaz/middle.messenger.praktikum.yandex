import Router from './Router';
import Block from '../Blocks/Block';

interface PropsWithRouter {
  router: typeof Router,
}

function withRouter(Component: typeof Block<any>): typeof Block {
  type Props = typeof Component extends typeof Block<infer P extends Record<string, any>> ? P : any;

  return class WithRouter extends Component {
    constructor(props: Props & PropsWithRouter) {
      super({ ...props, router: Router });
    }
  };
}

export { withRouter, PropsWithRouter };
