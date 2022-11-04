import FormBlock, { FormProps } from 'util/FormBlock';
import template from 'bundle-text:./add_chat.hbs';
import { addChat } from 'services/chat';
import withStore from 'util/withStore';
import { Block } from 'core/index';

class AddChatModal extends FormBlock {
  static componentName = 'AddChatModal';

  constructor(props: FormProps) {
    super({ ...props, submit: () => { this.submit(); } });
  }

  render() {
    return template;
  }

  submit() {
    console.log(this);
    if (!this.valid) {
      return;
    }
    this.props.store.dispatch(addChat, this.form_value);

    this.hide();
  }
}

export default withStore(AddChatModal as typeof Block);
