import Block from 'core/Block';
import template from 'bundle-text:./modal_footer.hbs';

class ModalFooter extends Block {
  static componentName = 'ModalFooter';

  protected render() {
    return template;
  }
}

export default ModalFooter;
