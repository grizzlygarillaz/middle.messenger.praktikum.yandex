import Block from 'core/Block';
import ModalProps from 'components/Modal/type';
import * as template from './modal.hbs';

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
