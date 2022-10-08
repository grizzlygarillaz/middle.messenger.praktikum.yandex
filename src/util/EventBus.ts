type Handler<A extends any[] = unknown[]> = (...args: A) => void;
type EventInterface<P> = P[keyof P];

class EventBus <
        E extends Record<string, string> = Record<string, string>,
        Args extends Record<EventInterface<E>, any[]> = Record<string, any[]>,
      > {
  private readonly listeners: {
    [K in EventInterface<E>]?: Handler<Args[K]>[]
  } = {};

  on<Event extends EventInterface<E>>(event: Event, callback: Handler<Args[Event]>) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event]!.push(callback);
  }

  off<Event extends EventInterface<E>>(event: Event, callback: Handler<Args[Event]>) {
    this.eventExist(event);

    this.listeners[event] = this.listeners[event]!.filter((listener) => listener !== callback);
  }

  emit<Event extends EventInterface<E>>(event: Event, ...args: Args[Event]) {
    this.eventExist(event);

    this.listeners[event]!.forEach((listener) => {
      listener(...args);
    });
  }

  eventExist(event: EventInterface<E>) {
    if (!this.listeners[event]) {
      return `Нет события: ${event}`;
    }
    return true;
  }
}

export default EventBus;
