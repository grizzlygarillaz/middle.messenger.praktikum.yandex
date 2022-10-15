import Block from 'core/Block';
import template from './modal.hbs';
import ModalProps from './type';

class Modal extends Block<ModalProps> {
  constructor(props: ModalProps) {
    super({
      ...props,
      show: false,
    });
  }

  protected render() {
    return this.compile(template, {
      ...this.props,
      children: this.children,
      closeModal: () => {
        this.hide();
      },
    });
  }
}

export default Modal;
