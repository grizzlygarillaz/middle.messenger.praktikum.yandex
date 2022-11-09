import BlockProps from 'typings/interfaces/Block';
import { PropsWithRouter } from 'util/withRouter';

interface LinkProps extends BlockProps, PropsWithRouter {
  label: string,
  href: string,
  theme?: ComponentTheme,
}

export default LinkProps;
