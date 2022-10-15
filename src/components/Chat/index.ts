import Block from 'core/Block';
import ChatProps from 'components/Chat/type';
import { chat_settings, clip, send } from 'img/icons';
import template from './chat.hbs';

const icons: Record<string, SVGAElement> = {
  clip,
  send,
  chat_settings,
};

class Chat extends Block<ChatProps> {
  protected render() {
    return this.compile(template, {
      ...this.props,
      children: this.children,
      icons,
    });
  }
}

export default Chat;
