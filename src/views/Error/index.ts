import Block from '../../util/Block';
import template from './error.hbs';
import ErrorProps from './type';

class ErrorPage extends Block {
  constructor(props: ErrorProps) {
    super('div', props);
  }

  render(): DocumentFragment {
    return this.compile(template, {
      children: this.children,
      ...this.props,
    });
  }
}

export default ErrorPage;
