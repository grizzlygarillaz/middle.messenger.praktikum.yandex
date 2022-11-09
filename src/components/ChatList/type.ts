import BlockProps from 'typings/interfaces/Block';
import { Store } from 'core/index';

export default interface ChatListProps extends BlockProps {
  chats: Chat[],
  selectChat: () => void,
  currentChat: string | null,
  store: Store<AppState>,
}
