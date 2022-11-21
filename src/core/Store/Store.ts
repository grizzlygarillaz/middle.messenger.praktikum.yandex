import EventBus from 'core/EventBus';
import { isEqual } from 'utils/helpers';

export enum StoreEvents {
  UPDATED = 'UPDATED',
}

export type Dispatch<State> = (
  nextStateOrAction: Partial<State> | Action<State>,
  payload?: any,
) => void;

export type Action<State> = (
  dispatch: Dispatch<State>,
  state: State,
  payload: any,
) => void;

class Store<State extends AnyRecord> extends EventBus {
  private state: State = {} as State;

  constructor(defaultState: State) {
    super();

    this.state = defaultState;
    this.set(defaultState);
  }

  public set(nextState: Partial<State>) {
    const prevState = { ...this.state };
    const newState = { ...this.state, ...nextState };

    if (isEqual(prevState, newState)) {
      return;
    }

    this.state = newState;

    this.emit(StoreEvents.UPDATED, prevState, nextState);
  }

  public forget(...forget: (keyof State)[]) {
    const prevState = { ...this.state };

    try {
      forget.forEach((key) => {
        delete this.state[key];
      });

      this.emit(StoreEvents.UPDATED, prevState, this.state);
    } catch {
      console.error(`${String(forget)} not found at Store`);
    }
  }

  public getState() {
    return this.state;
  }

  dispatch(nextStateOrAction: Partial<State> | Action<State>, payload?: any) {
    if (typeof nextStateOrAction === 'function') {
      nextStateOrAction(this.dispatch.bind(this), this.state, payload);
    } else {
      this.set({ ...this.state, ...nextStateOrAction });
    }
  }
}

export default Store;
