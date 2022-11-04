import Block from 'core/Block';
import template from 'bundle-text:./modal.hbs';
import ModalProps from 'components/Modal/type';

class Modal extends Block<ModalProps> {
  static componentName = 'Modal';

  constructor(props: ModalProps) {
    super({
      ...props,
      closeModal: () => this.hide(),
    });
  }

  protected render() {
    return template;
  }

  protected init() {
    super.init();
    this.hide();
  }
}

export default Modal;
