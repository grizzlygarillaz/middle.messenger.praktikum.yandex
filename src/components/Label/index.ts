import Block from 'core/Block';
import template from 'bundle-text:./label.hbs';
import LabelProps from 'components/Label/type';

class Label extends Block<LabelProps> {
  static componentName = 'Label';

  protected render() {
    return template;
  }
}

export default Label;
