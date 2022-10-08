import Block from '../../util/Blocks/Block';
import template from './message.hbs';
import MessageProps from './type';

class Message extends Block<MessageProps> {
  protected render() {
    return this.compile(template, this.props);
  }
}

export default Message;
