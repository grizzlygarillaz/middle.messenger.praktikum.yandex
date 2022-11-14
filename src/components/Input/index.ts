import Block from 'core/Block';
import { InputProps } from 'components/Input/type';
import Validator from 'utils/Validator';
import * as template from './input.hbs';

class Input extends Block<InputProps> {
  static componentName = 'Input';

  constructor(props: InputProps) {
    super({
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

    return Validator(value, {
      regex,
      minLength,
      maxLength,
    });
  }

  get value() {
    return (this.getContent() as HTMLInputElement).value;
  }

  get name() {
    return this.props.name;
  }

  protected render() {
    return template;
  }
}

export default Input;
