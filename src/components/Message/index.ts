import Block from '../../util/Block';
import template from './message.hbs';
import MessageProps from './type';

class Message extends Block {
  constructor(props: MessageProps) {
    super('div', props);
  }

  protected render() {
    return this.compile(template, this.props);
  }
}

export default Message;
