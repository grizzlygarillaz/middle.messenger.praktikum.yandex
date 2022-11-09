import CoreRouter from 'core/Router/CoreRouter';

export default class HashRouter implements CoreRouter {
  private routes: Record<string, Function> = {};

  private isStarted = false;

  start() {
    if (this.isStarted) {
      return;
    }

    this.isStarted = true;
    window.addEventListener('hashchange', () => this.onRouteChange());
    this.onRouteChange();
  }

  private onRouteChange() {
    const { hash } = window.location;

    const found = Object.entries(this.routes).some(([routeHash, callback]) => {
      if (routeHash === hash) {
        callback();
        return true;
      }

      return false;
    });

    if (!found && this.routes['*']) {
      this.routes['*']();
    }
  }

  use(hash: string, callback: Function) {
    this.routes[hash] = callback;
    return this;
  }

  go(hash: string) {
    window.location.hash = hash;
  }

  back() {
    window.history.back();
  }

  forward() {
    window.history.forward();
  }
}
