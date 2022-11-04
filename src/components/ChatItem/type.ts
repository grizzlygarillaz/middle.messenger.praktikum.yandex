import BlockProps from 'typings/interfaces/Block';
import { Store } from 'core/index';

export interface ChatItemProps extends BlockProps {
  chat: Chat,
  active: boolean,
  time: string,
  store: Store<AppState>
}
