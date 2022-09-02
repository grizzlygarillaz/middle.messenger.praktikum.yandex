import Block from '../../util/Block';
import template from './test.hbs';
import Button from '../../components/Button';
import registerComponent from '../../util/registerComponent';

registerComponent('Button', Button as any);

class TestPage extends Block {
  constructor() {
    super('div');
  }

  render() {
    return this.compile(template, { children: this.children });
  }
}

export default TestPage;
