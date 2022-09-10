import Block from '../../util/Block';
import template from './chat.hbs';
import ChatProps from './type';
import { clip, send, chat_settings } from '../../img/icons';

const icons: Record<string, SVGAElement> = {
  clip,
  send,
  chat_settings,
};

class Chat extends Block<ChatProps> {
  protected render() {
    return this.compile(template, {
      children: this.children,
      icons,
      ...this.props,
    });
  }
}

export default Chat;
