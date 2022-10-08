import Block from '../../util/Blocks/Block';
import template from './link.hbs';
import LinkProps from './type';
import { withRouter } from '../../util/Router/withRouter';

const Themes: Record<string, string> = {
  light: 'link_light',
  dark: 'dark_light',
};

class BaseLink extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: () => this.navigate(),
      },
    });
  }

  protected render() {
    return this.compile(template, {
      ...this.props,
      children: this.children,
      theme: Themes[this.props.theme ?? 'light'],
    });
  }

  navigate() {
    this.props.router.go(this.props.href);
  }
}

const Link = withRouter(BaseLink);

export default Link;
