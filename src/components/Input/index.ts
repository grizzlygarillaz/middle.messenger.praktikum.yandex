import Block from '../../util/Block';
import template from './input.hbs';
import { InputProps } from './type';
import Validator from '../../util/Validator';

class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super('input', {
      ...props,
      events: {
        blur: () => {
          this.checkValid();
        },
        focus: () => {
          this.checkValid();
        },
      },
    });
  }

  checkValid() {
    const { value } = this.element as HTMLInputElement;
    const { regex, minLength, maxLength } = this.props;

    this.props.valid = Validator(value, {
      regex,
      minLength,
      maxLength,
    });
  }

  get valid() {
    return this.props.valid;
  }

  get value() {
    return (this.getContent() as HTMLInputElement).value;
  }

  get name() {
    return this.props.name;
  }

  protected render() {
    return this.compile(template, {
      ...this.props,
      children: this.children,
    });
  }
}

export default Input;
