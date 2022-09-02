import Block from '../../util/Block';
import template from './button.hbs';

interface ButtonProps {
  label:string,
  events: Record<string, () => void>
}

class Button extends Block {
  constructor(props: ButtonProps) {
    super('button', props);
  }

  protected render() {
    return this.compile(template, { label: this.props.label });
  }
}

export default Button;
