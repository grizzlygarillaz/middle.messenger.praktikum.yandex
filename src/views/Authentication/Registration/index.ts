import template from './registration.hbs';
import FormBlock from '../../../util/FormBlock';

class RegistrationPage extends FormBlock {
  render(): DocumentFragment {
    return this.compile(template, {
      children: this.children,
    });
  }
}

export default RegistrationPage;
