import FormBlock from 'util/FormBlock';
import template from './profile.hbs';

class ProfilePage extends FormBlock {
  render(): DocumentFragment {
    return this.compile(template, {
      children: this.children,
    });
  }
}

export default ProfilePage;
