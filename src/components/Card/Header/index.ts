import Block from 'core/Block';
import template from './header.hbs';

class CardHeader extends Block {
  protected render() {
    return this.compile(template, {
      children: this.children,
    });
  }
}

export default CardHeader;
