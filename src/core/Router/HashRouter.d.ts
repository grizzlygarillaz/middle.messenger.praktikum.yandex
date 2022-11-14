import CoreRouter from 'core/Router/CoreRouter';
export default class HashRouter implements CoreRouter {
    private routes;
    private isStarted;
    start(): void;
    private onRouteChange;
    use(hash: string, callback: Function): this;
    go(hash: string): void;
    back(): void;
    forward(): void;
}
