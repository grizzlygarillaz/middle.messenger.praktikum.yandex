class EventBus {
  private readonly listeners: Record<string, Array<(...args: any) => void>> = {};

  constructor() {
    this.listeners = {};
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event, callback) {
    this.eventExist(event);

    this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
  }

  emit(event, ...args) {
    this.eventExist(event);

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }

  eventExist(event) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }
    return true;
  }
}

export default EventBus;
