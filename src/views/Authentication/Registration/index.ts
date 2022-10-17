import FormBlock from 'util/FormBlock';
import { SignUpData } from 'api/AuthAPI';
import AuthController from 'controllers/AuthController';
import template from 'bundle-text:./registration.hbs';

class RegistrationPage extends FormBlock {
  constructor() {
    super({
      events: {
        submit: (e: Event) => {
          e.preventDefault();

          const data = this.form_value as SignUpData;

          AuthController.signUp(data);
        },
      },
    });
  }

  init() {
    super.init();
  }

  render() {
    return template;
  }
}

export default RegistrationPage;
