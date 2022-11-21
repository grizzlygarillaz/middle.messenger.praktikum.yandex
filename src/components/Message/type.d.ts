import { BlockProps } from 'core/Block';
import { Store } from 'core/index';
export interface MessageProps extends BlockProps {
    messages: Message[];
    store: Store<AppState>;
}
