import Block from '../../../util/Blocks/Block';
import template from './footer.hbs';

class CardFooter extends Block {
  constructor() {
    super('div');
  }

  protected render() {
    return this.compile(template, {
      children: this.children,
    });
  }
}

export default CardFooter;
