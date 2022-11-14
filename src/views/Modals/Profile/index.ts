import { logout } from 'services/auth';
import { Block } from 'core/index';
import { updateUser } from 'services/user';
import FormBlock, { FormProps } from 'utils/FormBlock';
import withStore from 'utils/withStore';
import * as template from './profile.hbs';

interface ProfileModalProps extends FormProps {
  logout: () => void,
  user: User
}

class ProfileModal extends FormBlock<ProfileModalProps> {
  static componentName = 'ProfileModal';

  constructor(props: ProfileModalProps) {
    super({
      ...props,
      logout: () => {
        this.props.store.dispatch(logout);
      },
      submit: () => {
        const data = this.form_value;
        if (data.avatar) {
          const formData = new FormData();
          formData.append('avatar', data.avatar[0]);
          data.avatar = formData;
        }
        this.props.store.dispatch(updateUser, data);
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

export default withStore(ProfileModal as typeof Block);
