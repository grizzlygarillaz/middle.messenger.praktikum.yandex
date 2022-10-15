import { PropsWithRouter } from '../../util/withRouter';

interface LinkProps extends PropsWithRouter {
  label: string,
  href: string,
  theme?: string,
  events?: {
    click: () => void,
  },
}

export default LinkProps;
