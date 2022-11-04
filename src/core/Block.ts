import { nanoid } from 'nanoid';
import EventBus from 'core/EventBus';
import BlockProps from 'typings/interfaces/Block';
import { isEqual, merge } from 'util/helpers';
import Handlebars from 'handlebars';
import { Trigger } from 'components/index';

export interface BlockClass<P extends AnyRecord> extends Function {
  new (props: P): Block<P>;
  componentName?: string;
}
type Events = ValueOf<typeof Block.EVENTS>;

class Block<P extends Record<string, any> = BlockProps> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_CWU: 'flow:component-will-unmount',
    FLOW_RENDER: 'flow:render',
  } as const;

  public id = nanoid(12);

  public static componentName?: string;

  protected props: P;

  protected children: { [id: string]: Block } = {};

  private _element: HTMLUnknownElement;

  private eventBus: () => EventBus<Events>;

  protected refs: { [key: string]: Block } = {};

  protected modals: { [key: string]: Block } = {};

  constructor(props: P = {} as P) {
    const eventBus = new EventBus();

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  protected init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props);
  }

  private _addEvents() {
    const { events = {} } = this.props as P & { events: Record<string, () => void> };

    Object.keys(events).forEach((event) => {
      this._element?.addEventListener(event, events[event]);
    });
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  private _createResources() {
    this._element = this._createDocumentElement('div');
  }

  public setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    this.props = merge(this.props, nextProps) as P;

    this.eventBus().emit(Block.EVENTS.FLOW_CDU);
  };

  get element() {
    return this._element;
  }

  public getContent() {
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
          this.eventBus().emit(Block.EVENTS.FLOW_CDM);
        }
      }, 100);
    }

    return this.element;
  }

  private _compile(): DocumentFragment {
    const fragment = document.createElement('template');

    const template = Handlebars.compile(this.render());
    fragment.innerHTML = template({
      ...this.props, children: this.children, refs: this.refs, modals: this.modals,
    });
    Object.entries(this.children).forEach(([id, component]) => {
      const stub = fragment.content.querySelector(`[data-id="${id}"]`);

      if (!stub) {
        return;
      }

      const stubChildren = stub.childNodes.length ? stub.childNodes : [];

      const content = component.getContent();

      if (this.modals && (component.constructor as typeof Block).componentName === 'Trigger') {
        content.addEventListener('click', () => {
          console.log(this);
          const modalName: string = (component as Trigger).props?.openModal;
          if (modalName) {
            this.modals[modalName].show();
          }
        });
      }

      const componentClass = component.props.className;
      if (componentClass) {
        const className = componentClass.toString();
        content.classList.add(className);
      }

      stub.replaceWith(content);

      /**
       * Ищем элемент layout-а, куда вставлять детей
       */
      const slotContent = content.querySelector('slot') as HTMLElement;

      if (!stubChildren.length) {
        return;
      }

      if (slotContent.parentNode) {
        slotContent.parentNode.append(...stubChildren as []);
      } else {
        slotContent.append(...stubChildren as []);
      }

      slotContent.remove();
    });

    /**
     * Возвращаем фрагмент
     */
    return fragment.content;
  }

  private _render() {
    const fragment = this._compile();

    this._removeEvents();
    const newElement = fragment.firstElementChild as HTMLElement;

    this._element?.replaceWith(newElement);

    this._element = newElement;

    this._addEvents();
  }

  protected render(): string {
    return '';
  }

  private _componentDidMount(props: P) {
    this._checkInDom();

    this.componentDidMount(props);
  }

  protected componentDidMount(props: P) {
    this.props = merge(this.props, props) as P;
  }

  private _componentDidUpdate(oldProps: P, newProps: P) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  protected componentDidUpdate(oldProps: P, newProps: P) : boolean {
    return !isEqual(oldProps, newProps);
  }

  private _componentWillUnmount() {
    this.eventBus().destroy();
    this.componentWillUnmount();
  }

  protected componentWillUnmount() {}

  private _removeEvents() {
    const { events }: Record<string, () => void> = this.props;

    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.removeEventListener(event, listener);
    });
  }

  _checkInDom() {
    const elementInDOM = document.body.contains(this._element);

    if (elementInDOM) {
      setTimeout(() => this._checkInDom(), 1000);
      return;
    }

    this.eventBus().emit(Block.EVENTS.FLOW_CWU, this.props);
  }

  private _makePropsProxy(props: P): any {
    const self = this;

    return new Proxy(props as Record<string, unknown>, {
      get(target: Record<string, unknown>, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: Record<string, any>, prop: string, value: string) {
        const oldValue = { ...target };

        target[prop] = value;

        if (!isEqual(oldValue, target)) {
          self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldValue, target);
        }
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  public show() {
    this.getContent().style.display = 'block';
  }

  public hide() {
    this.getContent().style.display = 'none';
  }

  protected refresh() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDU, {}, this.props);
  }
}

export default Block;

export { BlockProps };
