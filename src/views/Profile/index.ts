import Block from '../../util/Block';
import template from './profile.hbs';

class ProfilePage extends Block {
  constructor() {
    super('div');
  }

  render(): DocumentFragment {
    return this.compile(template, {
      children: this.children,
    });
  }
}

export default ProfilePage;
