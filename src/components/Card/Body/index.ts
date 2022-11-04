import Block from 'core/Block';
import template from 'bundle-text:./body.hbs';

class CardBody extends Block {
  protected render() {
    return template;
  }
}

export default CardBody;
