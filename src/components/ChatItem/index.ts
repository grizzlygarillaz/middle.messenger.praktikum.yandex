import Block from '../../util/Blocks/Block';
import template from './chat_item.hbs';
import ChatItemProps from './type';

class ChatItem extends Block<ChatItemProps> {
  protected render() {
    return this.compile(template, {
      ...this.props,
      children: this.children,
    });
  }
}

export default ChatItem;
