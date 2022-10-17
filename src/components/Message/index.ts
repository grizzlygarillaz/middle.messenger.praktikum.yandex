import template from 'bundle-text:./message.hbs';
import { MessageProps } from 'components/Message/type';
import Block from '../../core/Block';

class Message extends Block<MessageProps> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: MessageProps) {
    super(props);
  }

  protected render() {
    return template;
  }
}

export default Message;
