import template from './login.hbs';
import FormBlock from '../../../util/Blocks/FormBlock';
import AuthController from '../../../controllers/AuthController';
import { SignUpData } from '../../../api/AuthAPI';
import withStore from '../../../util/Store/withStore';
import Block from '../../../util/Blocks/Block';

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

  render(): DocumentFragment {
    return this.compile(template, {
      ...this.props,
      children: this.children,
    });
  }
}

export default withStore((state) => ({ ...state.user }))(LoginPage as typeof Block);
