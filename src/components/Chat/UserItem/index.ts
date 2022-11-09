import Block from 'core/Block';
import template from 'bundle-text:./user_item.hbs';
import BlockProps from 'typings/interfaces/Block';
import { chatUserDelete } from 'services/chat';
import { Store } from 'core/index';
import withStore from 'util/withStore';

interface UserItemProps extends BlockProps {
  user: User,
  deleteUser: () => void,
  owner: boolean,
  store: Store<AppState>,
}

class UserItem extends Block<UserItemProps> {
  static componentName = 'UserItem';

  constructor(props: UserItemProps) {
    super({
      ...props,
      deleteUser: () => {
        this.props.store.dispatch(
          chatUserDelete,
          { userIds: [this.props.user.id], chatId: this.props.store.getState().currentChat?.id },
        );
      },
    });
  }

  protected componentDidMount(props: UserItemProps) {
    this.props.owner = this.props.store.getState().currentChat?.createdBy === this.props.user.id;
    super.componentDidMount(props);
  }

  protected render() {
    return template;
  }
}

export default withStore(UserItem as typeof Block);
