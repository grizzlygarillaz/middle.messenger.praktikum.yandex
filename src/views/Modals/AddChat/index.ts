import { addChat } from 'services/chat';
import { Block } from 'core/index';
import FormBlock, { FormProps } from 'utils/FormBlock';
import withStore from 'utils/withStore';
import template from './add_chat.hbs';

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
