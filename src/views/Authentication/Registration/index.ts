import { SignUpData } from 'api/AuthAPI';
import { register } from 'services/auth';
import { Block } from 'core/index';
import FormBlock, { FormProps } from 'utils/FormBlock';
import withStore from 'utils/withStore';
import { withRouter } from 'utils/withRouter';
import template from './registration.hbs';

class RegistrationPage extends FormBlock {
  static componentName = 'RegistrationPage';

  constructor(props: FormProps) {
    super({
      ...props,
      submit: () => {
        const data = this.form_value as SignUpData;

        console.log(data);

        this.props.store.dispatch(register, data);
      },
    });
  }

  render() {
    return template;
  }
}

export default withRouter(withStore(RegistrationPage as typeof Block));
