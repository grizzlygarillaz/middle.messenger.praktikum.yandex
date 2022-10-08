import Block from './Block';
import InputBox from '../../components/InputBox';
import Input from '../../components/Input';

class FormBlock<P extends Record<string, any> = any> extends Block<P> {
  constructor(props: P) {
    super({
      ...props,
    });
  }

  get valid() {
    return this.inputs.every((input) => (input as Input).valid);
  }

  get inputs() {
    return Object
      .values(this.children)
      .filter((child) => child instanceof InputBox)
      .reduce((previous: Block[], current) => previous.concat((current as InputBox).inputs), []);
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

export default FormBlock;
