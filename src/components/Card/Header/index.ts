import Block from 'core/Block';
import template from 'bundle-text:./header.hbs';

class CardHeader extends Block {
  protected render() {
    return template;
  }
}

export default CardHeader;
