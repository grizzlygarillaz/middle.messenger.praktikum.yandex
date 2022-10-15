import Block from 'core/Block';
import template from './footer.hbs';

class CardFooter extends Block {
  protected render() {
    return this.compile(template, {
      children: this.children,
    });
  }
}

export default CardFooter;
