import Block from 'core/Block';
import LinkProps from 'components/Link/type';
import template from 'bundle-text:./link.hbs';

const Themes: Record<string, string> = {
  light: 'link_light',
  dark: 'link_dark',
};

class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: () => this.navigate(),
      },
      theme: Themes[props.theme ?? 'light'],
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
