import Block from '../../../util/Blocks/Block';
import template from './body.hbs';

class CardBody extends Block {
  constructor() {
    super('div');
  }

  protected render() {
    return this.compile(template, {
      children: this.children,
    });
  }
}

export default CardBody;
