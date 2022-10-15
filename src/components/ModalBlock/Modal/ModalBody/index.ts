import Block from 'core/Block';
import template from './modal_body.hbs';

class ModalBody extends Block {
  protected render() {
    return this.compile(template, {
      ...this.props,
      children: this.children,
    });
  }
}

export default ModalBody;
