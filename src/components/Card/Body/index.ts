import Block from 'core/Block';
import * as template from './body.hbs';

class CardBody extends Block {
  static componentName = 'CardBody';

  protected render() {
    return template;
  }
}

export default CardBody;
