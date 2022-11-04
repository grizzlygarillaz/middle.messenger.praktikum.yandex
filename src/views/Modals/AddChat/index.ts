import FormBlock, { FormProps } from 'util/FormBlock';
import template from 'bundle-text:./add_chat.hbs';
import { addChat } from 'services/chat';

class AddChatModal extends FormBlock {
  constructor(props: FormProps) {
    super({ ...props, submit: () => { this.submit(); } });
  }

  render() {
    return template;
  }

  submit() {
    if (!this.valid) {
      return;
    }
    window.store.dispatch(addChat, this.form_value);

    this.hide();
  }
}

export default AddChatModal;
