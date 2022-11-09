import Block from 'core/Block';
import template from 'bundle-text:./modal_trigger.hbs';
import TriggerProps from 'components/Trigger/type';

class Trigger extends Block<TriggerProps> {
  static componentName = 'Trigger';

  constructor(props: TriggerProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  protected render() {
    return template;
  }
}

export default Trigger;
