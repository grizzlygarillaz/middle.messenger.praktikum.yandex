import template from './login.hbs';
import FormBlock from '../../../util/FormBlock';

interface LoginPageProps {
  events: {
    submit: (e: Event) => void;
  },
}

class LoginPage extends FormBlock<LoginPageProps> {
  render(): DocumentFragment {
    return this.compile(template, {
      ...this.props,
      children: this.children,
    });
  }
}

export default LoginPage;
