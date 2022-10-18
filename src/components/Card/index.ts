import Block from 'core/Block';
import template from 'bundle-text:./card.hbs';

class Card extends Block {
  constructor(props: {}) {
    super({
      ...props,
    });
  }

  protected render() {
    return template;
  }
}

export default Card;
