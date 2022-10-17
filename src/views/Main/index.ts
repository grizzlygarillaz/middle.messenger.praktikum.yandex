import Block from 'core/Block';
import withStore from 'util/withStore';
import store from 'core/Store';
import template from 'bundle-text:./main.hbs';
import MainProps from './type';

const messages = [
  {
    own: false,
    author: 'User name',
    date: '00:00',
    data: {
      text: 'Hello world',
    },
  },
  {
    own: true,
    author: 'User name',
    date: '00:00',
    data: { text: 'Hello world' },
  },
  {
    own: false,
    date: '00:00',
    author: 'User name',
    data: {
      text: 'Hello world! This is the longest text in a current chat',
    },
  },
];

const chats = [
  {
    name: 'Chat number 1',
    lastMessage: { text: 'Some text from chat no 1' },
    unread: 1,
    active: true,
    date: '00:00',
  },
  {
    name: 'Chat number 2',
    lastMessage: {
      author: 'Text Author',
      text: 'Some text from chat no 1',
    },
    date: '01:00',
  },
  {
    name: 'Chat number 3',
    lastMessage: { text: 'Some large text from giga large chat number 3, with some people' },
    date: '02:00',
  },
  {
    name: 'Chat number 4',
    lastMessage: { text: 'Some text from chat no 1' },
    unread: 123,
    date: '05:00',
  },
  {
    name: 'Chat number 5',
    lastMessage: { text: 'Some text from chat no 1' },
    unread: 4,
    date: '06:00',
  },
  {
    name: 'Chat number 6',
    lastMessage: { text: 'Some text from chat no 1' },
    unread: 4,
    date: '09:00',
  },
  {
    name: 'Chat number 7',
    lastMessage: { text: 'Some text from chat no 1' },
    unread: 4,
    date: '12:00',
  },
];

class MainPage extends Block<MainProps> {
  constructor(props: MainProps) {
    const { user } = store.getState();
    super({
      ...props,
      user,
      chats,
      messages,
    });
  }

  render() {
    return template;
  }

  componentDidMount(props: MainProps) {
    console.log(this.children);
    super.componentDidMount(props);
  }
}

const withUser = withStore((state) => ({ ...state.user }));

export default withUser(MainPage as typeof Block);
