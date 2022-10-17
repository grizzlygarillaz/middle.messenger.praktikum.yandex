import Block from 'core/Block';
import ChatItemProps from 'components/ChatItem/type';
import template from 'bundle-text:./chat_item.hbs';

class ChatItem extends Block<ChatItemProps> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: ChatItemProps) {
    super(props);
  }

  protected render() {
    return template;
  }
}

export default ChatItem;
