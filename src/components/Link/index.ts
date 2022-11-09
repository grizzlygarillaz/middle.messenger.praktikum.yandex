import Block from 'core/Block';
import LinkProps from 'components/Link/type';
import template from 'bundle-text:./link.hbs';

class Link extends Block<LinkProps> {
  static componentName = 'Link';

  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: () => this.navigate(),
      },
    });
  }

  protected render() {
    return template;
  }

  navigate() {
    window.router.go(this.props.href);
  }
}

export default Link;
