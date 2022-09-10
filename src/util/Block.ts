import { nanoid } from 'nanoid';
import EventBus from './EventBus';

class Block<P extends Record<string, any> = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  public id = nanoid(12);

  protected props: P = {} as P;

  protected children: Record<string, Block>;

  private _element: HTMLUnknownElement;

  private _meta: { tagName: string, props?: P };

  private eventBus: () => EventBus;

  /** JSDoc
   * @param {string} tagName
   * @param childrenAndProps
   *
   * @returns {void}
   */
  constructor(tagName = 'div', childrenAndProps: P = {} as P) {
    const eventBus = new EventBus();
    const { props, children } = this._getChildrenAndProps(childrenAndProps);

    this._meta = { tagName, props };

    this.children = children;

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildrenAndProps(childrenAndProps: P): { props: P, children: Record<string, Block> } {
    const props: P = {} as P;
    const children: Record<string, Block> = {};

    Object.entries(childrenAndProps).forEach(([key, value]: [keyof P, any]) => {
      if (value instanceof Block) {
        children[key as string] = value;
      } else {
        props[key] = value;
      }
    });

    return { props, children };
  }

  _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((event) => {
      this._element?.addEventListener(event, events[event]);
    });
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  _init() {
    this._createResources();

    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {}

  _componentDidMount(oldProps: any) {
    return this.props[oldProps];
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount(oldProps: P) {
    return this._componentDidMount(oldProps);
  }

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach((child) => child.dispatchComponentDidMount());
  }

  private _componentDidUpdate(oldProps: P, newProps: P) {
    if (!this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
    return false;
  }

  protected componentDidUpdate(oldProps: P, newProps: P) : boolean {
    return oldProps !== newProps;
  }

  setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  protected compile(template: (context: any) => string, context: any): DocumentFragment {
    const contextAndStubs = { ...context };

    // Object.entries(this.children).forEach(([name, component]) => {
    //   contextAndStubs[name] = `<div data-id="${component.id}"/>`;
    // });

    const html = template(contextAndStubs);

    const tmp = document.createElement('template');

    tmp.innerHTML = html;

    Object.entries(this.children).forEach(([, component]) => {
      const stub = tmp.content.querySelector(`[data-id="${component.id}"]`);

      if (!stub) {
        return;
      }
      component.getContent().append(...Array.from(stub.childNodes));

      stub.replaceWith(component.getContent()!);
    });

    return tmp.content;
  }

  private _render() {
    const fragment = this.render();

    const newElement = fragment.firstElementChild as HTMLElement;

    this._element?.replaceWith(newElement);

    this._element = newElement;

    this._addEvents();
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: P): any {
    const self = this;

    return new Proxy(props as Record<string, any>, {
      get(target: Record<string, any>, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: Record<string, any>, prop: string, value: string) {
        const oldValue = { ...target };

        target[prop] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldValue, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}

export default Block;
