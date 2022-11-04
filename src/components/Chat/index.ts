import Block from 'core/Block';
import ChatProps from 'components/Chat/type';
import { chat_settings, send } from 'img/icons';
import template from 'bundle-text:./chat.hbs';
import withStore from 'util/withStore';
import { addUserToChat, deleteChat } from 'services/chat';
import FormBlock from 'util/FormBlock';
import UserAPI from 'api/UserAPI';
import { objectToCamelCase, padTime } from 'util/helpers';
import { Input } from 'components/index';

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

  deleteChat() {
    if (!this.props.currentChat) {
      return;
    }

    this.props.store.dispatch(deleteChat, this.props.currentChat.id);
  }

  protected componentDidUpdate(oldProps: ChatProps, newProps: ChatProps): boolean {
    const { currentChat } = this.props.store.getState();

    if (!this.socket || currentChat !== this.props.currentChat) {
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
        const messages = data.sort((a, b) => Date.parse(a.time) - Date.parse(b.time))
          .map((message) => {
            message.own = message.userId === this.props.store.getState().user?.id;

            message.user = this.props.store.getState().currentChat?.users
              .find((chatUser) => chatUser.id === message.userId);

            message.date = padTime(message.time);

            return message;
          });
        this.props.store.dispatch({ messages });
      }
    });

    this.socket.addEventListener('open', () => {
      this.socket.send(JSON.stringify({
        content: '0',
        type: 'get old',
      }));

      this.intervalId = window.setInterval(() => {
        this.socket.send(JSON.stringify({ content: 'ping' }));

        this.socket.send(JSON.stringify({
          content: '0',
          type: 'get old',
        }));
      }, 1000);
    });
  }

  protected componentWillUnmount() {
    super.componentWillUnmount();
  }

  destroySocket() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    if (this.socket) {
      this.socket.close();
    }
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

    this.inputComponents.forEach((input: Input) => {
      (input.getContent() as HTMLInputElement).value = '';
    });
  }

  async addUser() {
    const { addUser } = this.form_value;

    if (addUser) {
      try {
        const user = await UserAPI.search({ login: addUser });

        this.props.store.dispatch(addUserToChat, {
          chatId: this.props.currentChat!.id,
          users: [user[0].id],
        });
      } catch (e) {
        console.error(e);
      }
    }
  }
}

export default withStore(Chat as typeof Block);
