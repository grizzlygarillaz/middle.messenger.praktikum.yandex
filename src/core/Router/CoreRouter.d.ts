export default interface CoreRouter {
    start(): void;
    use(pathname: string, callback: () => void): CoreRouter;
    go(pathname: string): void;
    back(): void;
    forward(): void;
}
