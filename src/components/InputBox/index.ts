import Block from '../../util/Block';
import template from './input_box.hbs';
import { InputBoxProps } from './type';
import Input from '../Input';

class InputBox extends Block<InputBoxProps> {
  constructor(props: InputBoxProps) {
    super('div', {
      ...props,
      valid: true,
      events: {
        focusout: () => {
          this.toggleError();
        },
        focusin: () => {
          this.toggleError();
        },
      },
    });
  }

  toggleError() {
    this.props.valid = Object.values(this.inputs).some((input) => (input as Input).valid);
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
      .filter((child) => child.getContent().tagName === 'INPUT');
  }

  get errors() : Block[] {
    return Object.values(this.children)
      .filter((child) => child.getContent().classList.contains('input__error'));
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
