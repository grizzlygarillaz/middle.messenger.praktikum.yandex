import Block from 'core/Block';
import ChatProps from 'components/Chat/type';
import { addUserToChat, deleteChat } from 'services/chat';
import FormBlock from 'utils/FormBlock';
import withStore from 'utils/withStore';
import { objectToCamelCase, padTime } from 'utils/helpers';
import { chat_settings, send } from 'img/icons';
import template from './chat.hbs';

class Chat extends FormBlock<ChatProps> {
  static componentName = 'Chat';

  socket: WebSocket;

  intervalId: number;

  constructor(props: ChatProps) {
    super({
      ...props,
      icons: {
        send,
        chat_settings,
      },
      deleteChat: () => { this.deleteChat(); },
      sendMessage: () => { this.sendMessage(); },
      addUser: () => { this.addUser(); },
    });
  }

  protected render() {
    return template;
  }

  protected componentDidUpdate(oldProps: ChatProps, newProps: ChatProps): boolean {
    const { currentChat } = this.props.store.getState();

    if (currentChat && currentChat !== this.props.currentChat) {
      this.initSocket();
    }

    this.props.currentChat = currentChat;

    return super.componentDidUpdate(oldProps, newProps);
  }

  async initSocket() {
    const { currentChat, user, token } = this.props.store.getState();

    await this.destroySocket();

    this.socket = await new WebSocket(`wss://ya-praktikum.tech/ws/chats/${user!.id}/${currentChat!.id}/${token}`);

    this.socket.addEventListener('message', async (event) => {
      const data: Message[] = objectToCamelCase(JSON.parse(await event.data)) as Message[];
      if (data && Array.isArray(data)) {
        const messages = this.formatMessages(data);
        this.props.store.dispatch({ messages });
      }
    });

    this.socket.addEventListener('open', () => {
      this.getOldMessages();

      this.intervalId = window.setInterval(() => {
        this.socket.send(JSON.stringify({ content: 'ping' }));

        this.getOldMessages();
      }, 1000);
    });
  }

  destroySocket() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    if (this.socket) {
      this.socket.close();
    }
  }

  formatMessages(messages: Message[]) {
    return messages.sort((a, b) => Date.parse(a.time) - Date.parse(b.time))
      .map((message) => {
        message.own = message.userId === this.props.store.getState().user?.id;

        message.user = this.props.store.getState().currentChat?.users
          .find((chatUser) => chatUser.id === message.userId);

        message.senderName = message.user?.displayName ?? message.user?.firstName;

        message.date = padTime(message.time);

        return message;
      });
  }

  getOldMessages() {
    this.socket.send(JSON.stringify({
      content: '0',
      type: 'get old',
    }));
  }

  sendMessage() {
    const { message } = this.form_value;

    if (!message) {
      return;
    }

    this.socket.send(JSON.stringify({
      content: message,
      type: 'message',
    }));

    (this.refs.send_message.getContent() as HTMLInputElement).value = '';
  }

  deleteChat() {
    if (!this.props.currentChat) {
      return;
    }

    this.props.store.dispatch(deleteChat, this.props.currentChat.id);
  }

  addUser() {
    const { login } = this.form_value;
    if (login) {
      this.props.store.dispatch(addUserToChat, { login, chatId: this.props.currentChat?.id });
    }
  }
}

export default withStore(Chat as typeof Block);
