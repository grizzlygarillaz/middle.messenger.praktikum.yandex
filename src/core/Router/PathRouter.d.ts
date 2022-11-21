import CoreRouter from 'core/Router/CoreRouter';
export default class PathRouter implements CoreRouter {
    private routes;
    private isStarted;
    start(): void;
    private onRouteChange;
    use(pathname: string, callback: Function): this;
    go(pathname: string): void;
    back(): void;
    forward(): void;
}
