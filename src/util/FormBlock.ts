import Block from 'core/Block';
import InputBox from 'components/InputBox';
import BlockProps from 'typings/interfaces/Block';
import Input from 'components/Input';

export default class FormBlock<T extends Record<string, any> = BlockProps> extends Block<T> {
  get valid() {
    return this.inputs.every((input) => (input as Input).valid);
  }

  get inputs() {
    return Object
      .values(this.children)
      .filter((child: Block) => child instanceof InputBox)
      .reduce((acc: Block[], current: Block) => acc.concat((current as InputBox).inputs), []);
  }

  validate() {
    this.inputs.every((input) => (input as Input).checkValid());
  }

  onSubmit(e: Event) {
    e.preventDefault();

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
