import Block from '../../../util/Block';
import template from './registration.hbs';

class RegistrationPage extends Block {
  constructor() {
    super('div');
  }

  render(): DocumentFragment {
    return this.compile(template, {
      children: this.children,
    });
  }
}

export default RegistrationPage;
