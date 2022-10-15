import Block from 'core/Block';
import ChatItemProps from 'components/ChatItem/type';
import template from './chat_item.hbs';

class ChatItem extends Block<ChatItemProps> {
  protected render() {
    return this.compile(template, {
      ...this.props,
    });
  }
}

export default ChatItem;
