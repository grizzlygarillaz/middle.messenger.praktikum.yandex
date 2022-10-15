import ErrorProps from 'views/Error/type';
import Block from 'core/Block';
import template from './error.hbs';

class ErrorPage extends Block<ErrorProps> {
  render(): DocumentFragment {
    return this.compile(template, {
      children: this.children,
      ...this.props,
    });
  }
}

export default ErrorPage;
