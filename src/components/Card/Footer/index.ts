import Block from 'core/Block';
import * as template from './footer.hbs';

class CardFooter extends Block {
  static componentName = 'CardFooter';

  protected render() {
    return template;
  }
}

export default CardFooter;
