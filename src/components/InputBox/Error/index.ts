import Block from 'core/Block';
import ErrorProps from 'components/InputBox/Error/type';
import template from './error.hbs';

class InputError extends Block<ErrorProps> {
  constructor(props: ErrorProps) {
    super({
      ...props,
      error: props.error ?? 'Некорректный формат ввода',
    });
  }

  protected render() {
    return this.compile(template, this.props);
  }
}

export default InputError;
