import Block from '../../../util/Blocks/Block';
import template from './header.hbs';

class CardHeader extends Block {
  constructor() {
    super('div');
  }

  protected render() {
    return this.compile(template, {
      children: this.children,
    });
  }
}

export default CardHeader;
