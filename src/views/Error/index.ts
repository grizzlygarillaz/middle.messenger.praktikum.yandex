import ErrorProps from 'views/Error/type';
import Block from 'core/Block';
import template from './error.hbs';

const defaultError = {
  code: 'Oops...',
  message: 'Something went wrong... contact with... somebody?',
  withoutReturn: false,
};

export const ERROR_TEMPLATE = {
  403: { code: 403, message: 'The page is forbidden' },
  404: { code: 404, message: 'The page is not found' },
  418: { code: 418, message: 'I’m a teapot' },
};

class ErrorPage extends Block<ErrorProps> {
  static componentName = 'ErrorPage';

  constructor(props: ErrorProps) {
    const values = { ...props, ...defaultError, ...window.store.getState().error };
    super(values);
  }

  render() {
    return template;
  }
}

export default ErrorPage;
