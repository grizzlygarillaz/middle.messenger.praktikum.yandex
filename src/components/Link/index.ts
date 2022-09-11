import Block from '../../util/Block';
import template from './link.hbs';
import LinkProps from './type';

const Themes: Record<string, string> = {
  light: 'link_light',
  dark: 'dark_light',
};

class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super('a', props);
  }

  protected render() {
    return this.compile(template, {
      ...this.props,
      theme: Themes[this.props.theme ?? 'light'],
    });
  }
}

export default Link;
