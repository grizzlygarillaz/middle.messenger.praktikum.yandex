type Listener<A extends unknown[] = any[]> = (...args: A) => void;

class EventBus <
        E extends string = string,
        A extends { [K in E]: unknown[] } = Record<E, any[]>,
      > {
  private listeners: { [K in E]?: Listener<A[E]>[] } = {};

  on(event: E, callback: Listener<A[E]>) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event]!.push(callback);
  }

  off(event: E, callback: Listener<A[E]>) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event] = this.listeners[event]!.filter((listener) => listener !== callback);
  }

  emit(event: E, ...args: A[E]) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event]!.forEach((listener) => {
      listener(...args);
    });
  }

  destroy() {
    this.listeners = {};
  }
}

export default EventBus;
