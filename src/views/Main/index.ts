import Block from 'core/Block';
import template from 'bundle-text:./main.hbs';
import { withRouter } from 'util/withRouter';
import MainProps from './type';

class MainPage extends Block<MainProps> {
  render() {
    return template;
  }

  protected componentDidUpdate(oldProps: MainProps, newProps: MainProps): boolean {
    // const { currentChat } = this.props.store.getState();
    // this.setProps({ chat: currentChat });
    console.log('updated main');
    return super.componentDidUpdate(oldProps, newProps);
  }
}

export default withRouter(MainPage as typeof Block);
