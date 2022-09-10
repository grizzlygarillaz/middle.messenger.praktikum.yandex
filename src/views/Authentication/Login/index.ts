import template from './login.hbs';
import FormBlock from '../../../util/FormBlock';

interface LoginPageProps {
  events: {
    submit: (e: Event) => void;
  },
}

class LoginPage extends FormBlock<LoginPageProps> {
  constructor(props: LoginPageProps) {
    super('forum', {
      ...props,
      events: {
        submit: (e: Event) => {
          console.log(this.inputsValue);
          this.validate();
          e.preventDefault();
        },
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(template, {
      ...this.props,
      children: this.children,
    });
  }
}

export default LoginPage;
