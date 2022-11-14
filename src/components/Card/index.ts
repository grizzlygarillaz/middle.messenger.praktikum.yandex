import Block from 'core/Block';
import * as template from './card.hbs';

class Card extends Block {
  static componentName = 'Card';

  protected render() {
    return template;
  }
}

export default Card;
