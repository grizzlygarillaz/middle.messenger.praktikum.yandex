import Block from 'core/Block';
import template from 'bundle-text:./modal.hbs';
import ModalProps from './type';

class ModalBlock extends Block<ModalProps> {
  constructor(props: ModalProps) {
    super({
      ...props,
      show: false,
    });
  }

  protected render() {
    return template;
  }
}

export default ModalBlock;
