import Block from 'core/Block';
import { ChatItemProps } from 'components/ChatItem/type';
import { changeChat } from 'services/chat';
import withStore from 'utils/withStore';
import { padTime } from 'utils/helpers';
import template from './chat_item.hbs';

class ChatItem extends Block<ChatItemProps> {
  public static componentName = 'ChatItem';

  constructor(props: ChatItemProps) {
    super({
      ...props,
      events: {
        click: () => {
          this.props.store.dispatch(changeChat, this.props.chat.id);
        },
      },
      time: props.chat.lastMessage ? padTime(props.chat.lastMessage.time) : '',
    });
  }

  protected componentDidUpdate(oldProps: ChatItemProps, newProps: ChatItemProps): boolean {
    this.props.active = this.props.chat === this.props.store.getState().currentChat;
    return super.componentDidUpdate(oldProps, newProps);
  }

  protected render() {
    return template;
  }
}

export default withStore(ChatItem as typeof Block);
