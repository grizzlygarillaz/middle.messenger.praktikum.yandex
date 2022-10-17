import ErrorProps from 'views/Error/type';
import Block from 'core/Block';
import template from 'bundle-text:./error.hbs';

class ErrorPage extends Block<ErrorProps> {
  render() {
    return template;
  }
}

export default ErrorPage;
