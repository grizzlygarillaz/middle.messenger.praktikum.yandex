type Listener<A extends unknown[] = any[]> = (...args: A) => void;

class EventBus <
        E extends string = string,
        A extends { [K in E]: unknown[] } = Record<E, any[]>,
      > {
  private readonly listeners: { [K in E]?: Listener<A[E]>[] } = {};

  on(event: E, callback: Listener<A[E]>) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event]!.push(callback);
  }

  off(event: E, callback: Listener<A[E]>) {
    this.eventExist(event);

    this.listeners[event] = this.listeners[event]!.filter((listener) => listener !== callback);
  }

  emit(event: E, ...args: A[E]) {
    this.eventExist(event);

    this.listeners[event]!.forEach((listener) => {
      listener(...args);
    });
  }

  eventExist(event: E) {
    if (!this.listeners[event]) {
      return `Нет события: ${event}`;
    }
    return true;
  }
}

export default EventBus;
