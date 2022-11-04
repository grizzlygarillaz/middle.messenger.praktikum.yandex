import Block from 'core/Block';
import template from 'bundle-text:./spinner.hbs';

interface SpinnerProps {
  size: string,
  theme: string,
}

class Spinner extends Block<SpinnerProps> {
  constructor(props: SpinnerProps) {
    super({
      ...props,
      theme: props.theme ?? 'light',
      size: props.size ?? 'medium',
    });
  }

  protected render() {
    return template;
  }
}

export default Spinner;
