import Block from '../../../util/Blocks/Block';
import template from './error.hbs';
import ErrorProps from './type';

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
