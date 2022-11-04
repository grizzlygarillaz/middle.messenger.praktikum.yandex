import Block from 'core/Block';
import template from 'bundle-text:./main.hbs';
import { withRouter } from 'util/withRouter';
import withStore from 'util/withStore';
import MainProps from './type';

class MainPage extends Block<MainProps> {
  render() {
    return template;
  }

  protected componentDidUpdate(oldProps: MainProps, newProps: MainProps): boolean {
    this.props.user = this.props.store.getState().user;
    console.log(this.props);
    return super.componentDidUpdate(oldProps, newProps);
  }

  protected componentDidMount(props: MainProps) {
    this.props.user = this.props.store.getState().user;
    super.componentDidMount(props);
  }
}

export default withRouter(withStore(MainPage as typeof Block));
