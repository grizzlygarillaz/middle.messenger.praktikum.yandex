import { nanoid } from 'nanoid';
import EventBus from './EventBus';

class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  public id = nanoid(12);

  protected props: Record<string, unknown>;

  protected children: Record<string, Block>;

  private _element: HTMLUnknownElement;

  private _meta: { tagName: string, props? };

  private eventBus: () => EventBus;

  /** JSDoc
   * @param {string} tagName
   * @param childrenAndProps
   *
   * @returns {void}
   */
  constructor(tagName = 'div', childrenAndProps: any = {}) {
    const eventBus = new EventBus();
    const { props, children } = this._getChildrenAndProps(childrenAndProps);

    this._meta = {
      tagName,
      props,
    };

    this.children = children;

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildrenAndProps(childrenAndProps: any) {
    const props: Record<string, unknown> = {};
    const children: Record<string, Block> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props, children };
  }

  _addEvents() {
    const { events = {} } = this.props as { events: Record<string, () => void> };

    Object.keys(events).forEach((event) => {
      this._element.addEventListener(event, events[event]);
    });
  }

  _registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    // this._element = this._createDocumentElement();
  }

  _init() {
    this._createResources();

    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {}

  _componentDidMount(oldProps) {
    return this.props[oldProps];
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount(oldProps) {
    return this._componentDidMount(oldProps);
  }

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps, newProps) {
    if (!this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
    return false;
  }

  protected componentDidUpdate(oldProps: unknown, newProps: unknown) {
    return oldProps !== newProps;
  }

  setProps = (nextProps) => {
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

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props) {
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: {}, prop: string, value: string) {
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

  _createDocumentElement(): HTMLUnknownElement {
    return document.createElement(this._meta.tagName);
  }

  createDocumentElement(): HTMLUnknownElement {
    return document.createElement(this._meta.tagName);
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}

export default Block;
