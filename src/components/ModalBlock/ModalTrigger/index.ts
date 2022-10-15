import Block from 'core/Block';
import template from './modal_trigger.hbs';

class ModalTrigger extends Block {
  protected render() {
    return this.compile(template, {
      ...this.props,
      children: this.children,
    });
  }
}

export default ModalTrigger;
