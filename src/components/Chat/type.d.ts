import { Store } from 'core/index';
import { FormProps } from '../../utils/FormBlock';
export default interface ChatProps extends FormProps {
    currentChat: Chat | null;
    messages: Message[];
    store: Store<AppState>;
    socket: WebSocket | null;
    deleteChat: () => void;
    addUser: () => void;
    removeUser: () => void;
    sendMessage: () => void;
}
