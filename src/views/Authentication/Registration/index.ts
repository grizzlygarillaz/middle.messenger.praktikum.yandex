import FormBlock, { FormProps } from 'util/FormBlock';
import { SignUpData } from 'api/AuthAPI';
import template from 'bundle-text:./registration.hbs';
import { register } from 'services/auth';
import { withRouter } from 'util/withRouter';
import withStore from 'util/withStore';
import { Block } from 'core/index';

class RegistrationPage extends FormBlock {
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
