import Block from 'core/Block';
import template from './card.hbs';

class Card extends Block {
  static componentName = 'Card';

  protected render() {
    return template;
  }
}

export default Card;
