import Block from 'core/Block';
import ChatListProps from 'components/ChatList/type';
import template from 'bundle-text:./chat_list.hbs';
import { getChats } from 'services/chat';
import withStore from 'util/withStore';

class ChatList extends Block<ChatListProps> {
  static componentName = 'ChatList';

  constructor(props: ChatListProps) {
    super({
      ...props,
      loading: true,
    });
  }

  protected componentDidMount(props: ChatListProps) {
    this.props.store.dispatch(getChats);
    this.props.chats = this.props.store.getState().chats;
    this.props.loading = false;
    super.componentDidMount(props);
  }

  protected componentDidUpdate(oldProps: ChatListProps, newProps: ChatListProps): boolean {
    this.props.chats = this.props.store.getState().chats;
    return super.componentDidUpdate(oldProps, newProps);
  }

  protected render() {
    return template;
  }
}

export default withStore(ChatList as typeof Block);
