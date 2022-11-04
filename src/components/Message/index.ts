import template from 'bundle-text:./message.hbs';
import { MessageProps } from 'components/Message/type';
import withStore from 'util/withStore';
import Block from '../../core/Block';

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
