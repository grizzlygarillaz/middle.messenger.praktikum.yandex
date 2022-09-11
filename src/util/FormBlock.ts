import Block from './Block';
import InputBox from '../components/InputBox';
import Input from '../components/Input';

class FormBlock<P extends Record<string, any> = any> extends Block<P> {
  get inputsValue() {
    return this.inputs.reduce((previousValue, currentValue) => {
      const input = (currentValue as Input);
      previousValue[input.name] = input.value;
      return previousValue;
    }, {} as Record<string, string>);
  }

  get inputs() {
    return Object.values(this.children)
      .filter((child) => child instanceof InputBox)
      .reduce((previous: Block[], current) => previous.concat((current as InputBox).inputs), []);
  }

  validate() {
    this.inputs.forEach((input) => {
      (input as Input).checkValid();
    });
  }

  get valid() {
    return this.inputs.every((input) => (input as Input).valid);
  }
}

export default FormBlock;
