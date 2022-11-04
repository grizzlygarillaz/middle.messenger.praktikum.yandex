import FormBlock, { FormProps } from 'util/FormBlock';
import template from 'bundle-text:./profile.hbs';
import { logout } from 'services/auth';
import withStore from 'util/withStore';
import { Block } from 'core/index';

interface ProfileModalProps extends FormProps {
  logout: () => void,
  user: User
}

class ProfileModal extends FormBlock<ProfileModalProps> {
  constructor(props: ProfileModalProps) {
    super({
      ...props,
      logout: () => {
        window.store.dispatch(logout);
      },
    });
  }

  render() {
    return template;
  }

  protected componentDidMount(props: ProfileModalProps) {
    this.props.user = this.props.store.getState().user!;
    super.componentDidMount(props);
  }
}

// TODO edit profile

export default withStore(ProfileModal as typeof Block);
