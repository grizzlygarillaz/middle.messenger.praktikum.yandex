import { set } from 'util/helpers';
import EventBus from './EventBus';

enum StoreEvents {
  UPDATED = 'UPDATED',
}

class Store extends EventBus {
  private state: any = {};

  public set(path: string, data: unknown) {
    set(this.state, path, data);

    this.emit(StoreEvents.UPDATED, this.getState());
  }

  public getState() {
    return this.state;
  }
}

export default new Store();

export { StoreEvents };
