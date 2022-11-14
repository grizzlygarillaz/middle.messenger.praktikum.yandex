import Block from 'core/Block';
import template from './body.hbs';

class CardBody extends Block {
  static componentName = 'CardBody';

  protected render() {
    return template;
  }
}

export default CardBody;
