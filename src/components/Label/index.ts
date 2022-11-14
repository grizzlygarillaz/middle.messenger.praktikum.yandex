import Block from 'core/Block';
import LabelProps from 'components/Label/type';
import * as template from './label.hbs';

class Label extends Block<LabelProps> {
  static componentName = 'Label';

  protected render() {
    return template;
  }
}

export default Label;
