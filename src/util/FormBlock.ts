import Block from './Block';

class FormBlock<P extends Record<string, any> = any> extends Block<P> {
  get inputsValue() {
    return this.inputs.reduce((previousValue, currentValue) => {
      previousValue[currentValue.name] = currentValue.value;
      return previousValue;
    }, {} as Record<string, string>);
  }

  get inputs(): HTMLInputElement[] {
    return Array.from(this.getContent().querySelectorAll('input'));
  }

  validate() {
    console.log(this.children);
  }
}

export default FormBlock;
