import { nanoid } from 'nanoid';
import EventBus from 'core/EventBus';
import BlockProps from 'typings/interfaces/Block';
import { merge } from 'util/helpers';
import Handlebars from 'handlebars';
import ModalTrigger from 'components/ModalTrigger';

type Events = ValueOf<typeof Block.EVENTS>;

class Block<P extends Record<string, any> = BlockProps> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  public id = nanoid(12);

  protected props: P;

  protected children: Record<string, Block> = {};

  private _element: HTMLUnknownElement;

  private eventBus: () => EventBus<Events>;

  protected refs: { [key: string]: Block } = {};

  protected modals: { [key: string]: Block } = {};

  constructor(props: P = {} as P) {
    const eventBus = new EventBus();
    // console.log(childrenAndProps);
    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
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
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  _createResources() {
    this._element = this._createDocumentElement('div');
  }

  // protected getStateFromProps(props: any): void {
  //   this.state = {};
  // }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props);
  }

  private _componentDidMount(props: P) {
    this.componentDidMount(props);
  }

  public componentDidMount(props: P) {
    this.props = merge(this.props, props) as P;
  }
  //
  // public dispatchComponentDidMount() {
  //   this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  //
  //   Object.values(this.children).forEach((child) => child.dispatchComponentDidMount());
  // }

  private _componentDidUpdate(oldProps: P, newProps: P) {
    if (!this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
    return false;
  }

  protected componentDidUpdate(oldProps: P, newProps: P) : boolean {
    return oldProps !== newProps;
  }

  public setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    this.props = merge(nextProps, this.props) as P;
    this.eventBus().emit(Block.EVENTS.FLOW_CDU);
  };

  get element() {
    return this._element;
  }

  private _compile(): DocumentFragment {
    const fragment = document.createElement('template');

    const template = Handlebars.compile(this.render());
    fragment.innerHTML = template({
      ...this.props, children: this.children, refs: this.refs, modals: this.modals,
    });
    Object.entries(this.children).forEach(([id, component]) => {
      /**
       * Ищем заглушку по id
       */
      const stub = fragment.content.querySelector(`[data-id="${id}"]`);

      if (!stub) {
        return;
      }

      const stubChildren = stub.childNodes.length ? stub.childNodes : [];

      /**
       * Заменяем заглушку на component._element
       */
      const content = component.getContent();

      if (component.constructor.name === 'ModalTrigger') {
        content.addEventListener('click', () => {
          this.modals[(component as ModalTrigger).props.openModal].show();
        });
      }

      if ((component.props as BlockProps).className) {
        content.classList.add((component.props as BlockProps).className!.toString());
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
    this.initModalTrigger();

    const fragment = this._compile();

    this._removeEvents();
    const newElement = fragment.firstElementChild as HTMLElement;

    this._element?.replaceWith(newElement);

    this._element = newElement;

    this._addEvents();
  }

  _removeEvents() {
    const { events }: Record<string, () => void> = this.props;

    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.removeEventListener(event, listener);
    });
  }

  protected render(): string {
    return '';
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

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldValue, target);
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

  protected initModalTrigger() {
    Object.entries(this.children).forEach(([id, child]) => {
      console.log(child, id);
    });

    // .forEach((trigger: ModalTrigger) => {
    //   trigger.setProps({
    //     events: {
    //       click: () => {
    //         console.log('test');
    //       },
    //     },
    //   });
    //   console.log(trigger.props.modal);
    // });
  }
}

export default Block;

export { BlockProps };
