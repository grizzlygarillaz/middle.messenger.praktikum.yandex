import Block from 'core/Block';
import InputBox from 'components/InputBox';
import BlockProps from 'typings/interfaces/Block';
import Input from 'components/Input';
import { Store } from 'core/index';

export interface FormProps extends BlockProps {
  submit: () => void,
  formError?: string,
  store: Store<AppState>
}

export default class FormBlock<T extends {} = FormProps> extends Block<T> {
  get valid() {
    return this.inputComponents.every((input: Block) => (input as Input).checkValid());
  }

  get inputComponents() {
    return Object
      .values(this.children)
      .filter((child: Block) => child instanceof InputBox || child instanceof Input);
  }

  get inputs() {
    return this.inputComponents
      .reduce((acc: Block[], current) => {
        const input = current instanceof InputBox ? current.inputs : current;
        return acc.concat(input);
      }, []);
  }

  validate() {
    this.inputComponents.every((input) => (input as Input).checkValid());
  }

  onSubmit() {
    this.validate();

    console.log(this.form_value);
  }

  get form_value() {
    return this.inputs.reduce(
      (acc: Record<string, any>, child) => {
        acc[(child as Input).name] = (child as Input).value;
        return acc;
      },
      {},
    );
  }
}
