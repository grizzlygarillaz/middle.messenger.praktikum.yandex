import { Block, CoreRouter, Store } from 'core/index';
export declare enum Views {
    LOGIN = "Login",
    REGISTER = "Registration",
    MAIN = "Main",
    ERROR = "Error"
}
export declare enum Paths {
    LOGIN = "/",
    REGISTER = "/sign-up",
    MAIN = "/messenger",
    ERROR = "*"
}
export declare const getViewComponent: (view: Views) => typeof Block<any>;
export declare function initRouter(router: CoreRouter, store: Store<AppState>): void;
