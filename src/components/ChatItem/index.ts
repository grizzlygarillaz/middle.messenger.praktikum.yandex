import Block from '../../util/Block';
import template from './chat_item.hbs';
import ChatItemProps from './type';

class ChatItem extends Block<ChatItemProps> {
  constructor(props: ChatItemProps) {
    super('div', props);
  }

  protected render() {
    return this.compile(template, {
      ...this.props,
      children: this.children,
    });
  }
}

export default ChatItem;
