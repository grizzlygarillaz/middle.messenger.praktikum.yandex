import Block from 'core/Block';
import template from './card.hbs';

class Card extends Block {
  protected render() {
    return this.compile(template, {
      children: this.children,
    });
  }
}

export default Card;
