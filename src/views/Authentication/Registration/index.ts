import template from './registration.hbs';
import FormBlock from '../../../util/Blocks/FormBlock';
import { SignUpData } from '../../../api/AuthAPI';
import AuthController from '../../../controllers/AuthController';

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

  render(): DocumentFragment {
    return this.compile(template, {
      children: this.children,
    });
  }
}

export default RegistrationPage;
