import Block from '../../../util/Block';
import template from './error.hbs';
import ErrorProps from './type';

class InputError extends Block<ErrorProps> {
  constructor(props: ErrorProps) {
    super('span', {
      ...props,
      error: props.error ?? 'Something was wrong(',
    });
  }

  protected render() {
    return this.compile(template, this.props);
  }
}

export default InputError;
