import Block from 'core/Block';
import ButtonProps from 'components/Button/type';
import template from 'bundle-text:./button.hbs';

class Button extends Block<ButtonProps> {
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
