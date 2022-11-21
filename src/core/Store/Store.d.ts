import EventBus from 'core/EventBus';
export declare enum StoreEvents {
    UPDATED = "UPDATED"
}
export declare type Dispatch<State> = (nextStateOrAction: Partial<State> | Action<State>, payload?: any) => void;
export declare type Action<State> = (dispatch: Dispatch<State>, state: State, payload: any) => void;
declare class Store<State extends AnyRecord> extends EventBus {
    private state;
    constructor(defaultState: State);
    set(nextState: Partial<State>): void;
    forget(...forget: (keyof State)[]): void;
    getState(): State;
    dispatch(nextStateOrAction: Partial<State> | Action<State>, payload?: any): void;
}
export default Store;
