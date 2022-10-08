import Block from '../../util/Blocks/Block';
import template from './error.hbs';
import ErrorProps from './type';

class ErrorPage extends Block<ErrorProps> {
  render(): DocumentFragment {
    return this.compile(template, {
      children: this.children,
      ...this.props,
    });
  }
}

export default ErrorPage;
