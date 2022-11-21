import Block from 'core/Block';
import TriggerProps from 'components/Trigger/type';
import template from './trigger.hbs';

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
