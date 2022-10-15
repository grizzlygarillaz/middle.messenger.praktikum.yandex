import CloseButtonProps from 'components/CloseButton/type';
import Block from 'core/Block';
import { close } from 'img/icons';
import template from './close_button.hbs';

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
