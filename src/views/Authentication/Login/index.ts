import { SignUpData } from 'api/AuthAPI';
import Block from 'core/Block';
import { login } from 'services/auth';
import FormBlock, { FormProps } from 'utils/FormBlock';
import withStore from 'utils/withStore';
import { withRouter } from 'utils/withRouter';
import * as template from './login.hbs';

class LoginPage extends FormBlock<FormProps> {
  static componentName = 'LoginPage';

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
