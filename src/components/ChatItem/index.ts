import Block from '../../util/Block';
import template from './chat_item.hbs';
import ChatItemProps from './type';

class ChatItem extends Block<ChatItemProps> {
  protected render() {
    return this.compile(template, {
      children: this.children,
      ...this.props,
    });
  }
}

export default ChatItem;
