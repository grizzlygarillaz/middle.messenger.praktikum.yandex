declare type Listener<A extends unknown[] = any[]> = (...args: A) => void;
declare class EventBus<E extends string = string, A extends {
    [K in E]: unknown[];
} = Record<E, any[]>> {
    private listeners;
    on(event: E, callback: Listener<A[E]>): void;
    off(event: E, callback: Listener<A[E]>): void;
    emit(event: E, ...args: A[E]): void;
    destroy(): void;
}
export default EventBus;
