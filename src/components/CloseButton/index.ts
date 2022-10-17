import CloseButtonProps from 'components/CloseButton/type';
import Block from 'core/Block';
import { close } from 'img/icons';
import template from 'bundle-text:./close_button.hbs';

class CloseButton extends Block<CloseButtonProps> {
  constructor(props: CloseButtonProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
      icons: {
        close,
      },
    });
  }

  protected render() {
    return template;
  }
}

export default CloseButton;
