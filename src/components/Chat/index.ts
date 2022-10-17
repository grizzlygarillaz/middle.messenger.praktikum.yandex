import Block from 'core/Block';
import ChatProps from 'components/Chat/type';
import { chat_settings, clip, send } from 'img/icons';
import template from 'bundle-text:./chat.hbs';

const icons: Record<string, SVGAElement> = {
  clip,
  send,
  chat_settings,
};

class Chat extends Block<ChatProps> {
  constructor(props: ChatProps) {
    super({ ...props, icons });
  }

  protected render() {
    return template;
  }
}

export default Chat;
