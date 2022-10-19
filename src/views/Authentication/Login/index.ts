import FormBlock from 'util/FormBlock';
import { SignUpData } from 'api/AuthAPI';
import AuthController from 'controllers/AuthController';
import withStore from 'util/withStore';
import template from 'bundle-text:./login.hbs';
import Block from 'core/Block';

interface LoginPageProps {
  events: {
    submit: (e: Event) => void;
  },
}

class LoginPage extends FormBlock<LoginPageProps> {
  constructor(props: LoginPageProps) {
    super({
      ...props,
      events: {
        submit: (e: Event) => {
          this.onSubmit(e);

          const data = this.form_value as SignUpData;

          AuthController.signIn(data);
        },
      },
    });
  }

  render() {
    console.log(this);
    return template;
  }
}

export default withStore((state) => ({ ...state.user }))(LoginPage as typeof Block);
