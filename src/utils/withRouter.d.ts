import Block from 'core/Block';
import CoreRouter from 'core/Router/CoreRouter';
interface PropsWithRouter {
    router: CoreRouter;
}
declare function withRouter(Component: typeof Block<any>): typeof Block<any>;
export { withRouter, PropsWithRouter };
