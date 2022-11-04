import Block from 'core/Block';
import InputBoxProps from 'components/InputBox/type';
import InputError from 'components/InputBox/Error';
import Input from 'components/Input';
import template from 'bundle-text:./input_box.hbs';

class InputBox extends Block<InputBoxProps> {
  constructor(props: InputBoxProps) {
    super({
      ...props,
      error: props.error ?? 'Некорректный формат ввода',
      events: {
        focusout: () => {
          this.checkValid();
        },
      },
    });
  }

  checkValid() {
    const { input, error } = this.refs;

    if ((input as Input).checkValid()) {
      (error as InputError).setProps({ error: '' });
      return true;
    }
    (error as InputError).setProps({ error: this.props.error });
    return false;
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
    return template;
  }
}

export default InputBox;
