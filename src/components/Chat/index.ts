import Block from '../../util/Blocks/Block';
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
      ...this.props,
      children: this.children,
      icons,
    });
  }
}

export default Chat;
