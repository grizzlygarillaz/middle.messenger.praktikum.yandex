import Block from 'core/Block';
import ErrorProps from 'components/InputBox/Error/type';
import template from 'bundle-text:./error.hbs';

class InputError extends Block<ErrorProps> {
  constructor(props: ErrorProps) {
    super({
      ...props,
      error: props.error ?? 'Некорректный формат ввода',
    });
  }

  protected render() {
    return template;
  }
}

export default InputError;
