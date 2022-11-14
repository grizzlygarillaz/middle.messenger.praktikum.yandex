import Block from 'core/Block';
import * as template from './modal_body.hbs';

class ModalBody extends Block {
  static componentName = 'ModalBody';

  protected render() {
    return template;
  }
}

export default ModalBody;
