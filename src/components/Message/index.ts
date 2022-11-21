import { MessageProps } from 'components/Message/type';
import { Block } from 'core/index';
import withStore from 'utils/withStore';
import template from './message.hbs';

class Messages extends Block<MessageProps> {
  static componentName = 'Messages';

  constructor(props: MessageProps) {
    super({
      ...props,
      loading: true,
    });
  }

  protected render() {
    return template;
  }

  protected componentDidUpdate(oldProps: MessageProps, newProps: MessageProps): boolean {
    this.props.messages = this.props.store.getState().messages;
    this.getContent().scrollTo(0, this.getContent().scrollHeight);
    return super.componentDidUpdate(oldProps, newProps);
  }

  protected componentDidMount(props: MessageProps) {
    this.props.messages = this.props.store.getState().messages;
    this.getContent().scrollTo(0, this.getContent().scrollHeight);
    this.props.loading = false;
    super.componentDidMount(props);
  }
}

export default withStore(Messages as typeof Block);
