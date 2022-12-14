import Block from 'core/Block';
import withStore from 'utils/withStore';
import template from './main.hbs';
import MainProps from './type';

class MainPage extends Block<MainProps> {
  static componentName = 'MainPage';

  render() {
    return template;
  }

  protected componentDidUpdate(oldProps: MainProps, newProps: MainProps): boolean {
    this.props.user = window.store.getState().user;
    return super.componentDidUpdate(oldProps, newProps);
  }

  protected componentDidMount(props: MainProps) {
    this.props.user = window.store.getState().user;
    super.componentDidMount(props);
  }
}

export default withStore(MainPage as typeof Block);
