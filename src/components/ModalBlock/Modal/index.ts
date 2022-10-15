import Block from 'core/Block';
import template from './modal_block.hbs';

class ModalBlock extends Block {
  protected render() {
    return this.compile(template, {
      ...this.props,
      children: this.children,
    });
  }
}

export default ModalBlock;
