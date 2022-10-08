import Block from '../../util/Blocks/Block';
import template from './close_button.hbs';
import CloseButtonProps from './type';
import { close } from '../../img/icons';

class CloseButton extends Block<CloseButtonProps> {
  constructor(props: CloseButtonProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  protected render() {
    return this.compile(template, {
      ...this.props,
      closeIcon: close,
    });
  }
}

export default CloseButton;
