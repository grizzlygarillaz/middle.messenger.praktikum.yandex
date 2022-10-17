import Block from 'core/Block';
import InputBoxProps from 'components/InputBox/type';
import InputError from 'components/InputBox/Error';
import Input from 'components/Input';
import template from 'bundle-text:./input_box.hbs';

class InputBox extends Block<InputBoxProps> {
  constructor(props: InputBoxProps) {
    super({
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
    this.errors.forEach((error) => { error.hide(); });

    return template;
  }
}

export default InputBox;
