import Block from 'core/Block';
import template from './body.hbs';

class CardBody extends Block {
  protected render() {
    return this.compile(template, {
      children: this.children,
    });
  }
}

export default CardBody;
