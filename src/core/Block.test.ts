// eslint-disable-next-line max-classes-per-file
import BlockProps from 'typings/interfaces/Block';
import { Block } from './index';
import EventBus from './EventBus';

type Events = ValueOf<typeof Block.EVENTS>;

class MockedBlock extends Block {
  mockedEventBus: () => EventBus<Events>;

  public mock = jest.fn((event) => event);

  constructor(props: BlockProps) {
    super(props);

    const eventBus = new EventBus();

    this.mockedEventBus = () => eventBus;

    this._registerMockedEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  protected componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    this.mockedEventBus().emit(Block.EVENTS.FLOW_CDU);
    return super.componentDidUpdate(oldProps, newProps);
  }

  private _registerMockedEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, () => this.mock('init'));
    eventBus.on(Block.EVENTS.FLOW_CDU, () => this.mock('CDU'));
  }
}

describe('cord/Block', () => {
  it('should emit init event', () => {
    const component = new MockedBlock({});
    expect(component.mock).toBeCalledWith('init');
  });

  it('should emit CDU event', () => {
    const component = new MockedBlock({});
    component.setProps({ props: 'new' });

    expect(component.mock).toBeCalledWith('CDU');
  });
});
