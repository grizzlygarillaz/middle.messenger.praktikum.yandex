import CoreRouter from 'core/Router/CoreRouter';

export default class PathRouter implements CoreRouter {
  private routes: Record<string, Function> = {};

  private isStarted = false;

  start() {
    if (this.isStarted) {
      return;
    }

    this.isStarted = true;
    window.onpopstate = () => {
      this.onRouteChange.call(this);
    };
    this.onRouteChange();
  }

  private onRouteChange(pathname: string = window.location.pathname) {
    if (window.location.pathname === pathname) {
      return;
    }
    const found = Object.entries(this.routes).some(([routePath, callback]) => {
      if (routePath === pathname) {
        callback();
        return true;
      }

      return false;
    });

    if (!found && this.routes['*']) {
      this.routes['*']();
    }
  }

  use(pathname: string, callback: Function) {
    this.routes[pathname] = callback;
    return this;
  }

  go(pathname: string) {
    this.onRouteChange(pathname);
    window.history.pushState({}, '', pathname);
  }

  back() {
    window.history.back();
  }

  forward() {
    window.history.forward();
  }
}
