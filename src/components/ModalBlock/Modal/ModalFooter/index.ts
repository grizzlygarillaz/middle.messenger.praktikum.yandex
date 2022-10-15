import Block from 'core/Block';
import template from './modal_footer.hbs';

class ModalFooter extends Block {
  protected render() {
    return this.compile(template, {
      ...this.props,
      children: this.children,
    });
  }
}

export default ModalFooter;
