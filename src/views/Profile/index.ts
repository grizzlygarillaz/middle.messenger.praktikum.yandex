import template from './profile.hbs';
import FormBlock from '../../util/FormBlock';

class ProfilePage extends FormBlock {
  render(): DocumentFragment {
    return this.compile(template, {
      children: this.children,
    });
  }
}

export default ProfilePage;
