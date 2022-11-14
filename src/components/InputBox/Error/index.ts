import Block from 'core/Block';
import ErrorProps from 'components/InputBox/Error/type';
import * as template from './error.hbs';

class InputError extends Block<ErrorProps> {
  static componentName = 'InputError';

  protected render() {
    return template;
  }
}

export default InputError;
