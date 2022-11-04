import FormBlock, { FormProps } from 'util/FormBlock';
import { SignUpData } from 'api/AuthAPI';
import withStore from 'util/withStore';
import template from 'bundle-text:./login.hbs';
import Block from 'core/Block';
import { withRouter } from 'util/withRouter';
import { login } from 'services/auth';

class LoginPage extends FormBlock<FormProps> {
  constructor(props: FormProps) {
    super({
      ...props,
      submit: () => {
        const data = this.form_value as SignUpData;

        console.log(data);

        this.props.store.dispatch(login, data);
      },
    });
  }

  render() {
    return template;
  }
}

export default withRouter(withStore(LoginPage as typeof Block));
