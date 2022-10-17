import Block from 'core/Block';
import template from 'bundle-text:./modal_block.hbs';

class Modal extends Block {
  protected render() {
    return template;
  }
}

export default Modal;
