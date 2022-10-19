import Block from 'core/Block';
import template from 'bundle-text:./modal_trigger.hbs';
import ModalTriggerProps from 'components/ModalTrigger/type';

class ModalTrigger extends Block<ModalTriggerProps> {
  constructor(props: ModalTriggerProps) {
    super({ ...props, events: { click: props.openModal } });
  }

  protected render() {
    return template;
  }
}

export default ModalTrigger;
