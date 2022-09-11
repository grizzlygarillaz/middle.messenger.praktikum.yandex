import Block from '../../util/Block';
import template from './card.hbs';

class Card extends Block {
  constructor() {
    super('div');
  }

  protected render() {
    return this.compile(template, {
      children: this.children,
    });
  }
}

export default Card;
