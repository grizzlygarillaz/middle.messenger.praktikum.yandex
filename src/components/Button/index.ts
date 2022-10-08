import Block from '../../util/Blocks/Block';
import template from './button.hbs';
import ButtonProps from './type';

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
    return this.compile(template, this.props);
  }
}

export default Button;
