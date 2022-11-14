import Block from 'core/Block';
import ButtonProps from 'components/Button/type';
import * as template from './button.hbs';

class Button extends Block<ButtonProps> {
  static componentName = 'Button';

  constructor(props: ButtonProps) {
    super({
      ...props,
      type: props.type ?? 'submit',
      events: {
        click: props.onClick,
      },
    });
  }

  protected render() {
    return template;
  }
}

export default Button;
