import Block from 'core/Block';
import ErrorProps from 'components/InputBox/Error/type';
import template from 'bundle-text:./error.hbs';

class InputError extends Block<ErrorProps> {
  protected render() {
    return template;
  }
}

export default InputError;
