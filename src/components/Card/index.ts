import Block from 'core/Block';
import template from 'bundle-text:./card.hbs';

class Card extends Block {
  static componentName = 'Card';

  protected render() {
    return template;
  }
}

export default Card;
