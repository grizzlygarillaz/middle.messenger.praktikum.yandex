import Block from 'core/Block';
import template from './header.hbs';

class CardHeader extends Block {
  static componentName = 'CardHeader';

  protected render() {
    return template;
  }
}

export default CardHeader;
