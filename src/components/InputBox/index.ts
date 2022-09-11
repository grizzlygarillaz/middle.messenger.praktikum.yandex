import Block from '../../util/Block';
import template from './input_box.hbs';
import { InputBoxProps } from './type';
import Input from '../Input';
import InputError from './Error';

class InputBox extends Block<InputBoxProps> {
  constructor(props: InputBoxProps) {
    super('div', {
      ...props,
      valid: true,
      events: {
        focusout: () => {
          this.toggleError();
        },
      },
    });
  }

  toggleError() {
    this.props.valid = Object.values(this.inputs).every((input) => (input as Input).valid);
    this.errors.forEach((error) => {
      if (this.props.valid) {
        error.hide();
      } else {
        error.show();
      }
    });
  }

  get inputs() : Block[] {
    return Object.values(this.children)
      .filter((child) => child instanceof Input);
  }

  get errors() : Block[] {
    return Object.values(this.children)
      .filter((child) => child instanceof InputError);
  }

  protected render() {
    const fragment = this.compile(template, {
      ...this.props,
      children: this.children,
    });

    this.errors.forEach((error) => { error.hide(); });

    return fragment;
  }
}

export default InputBox;
