import BlockProps from 'typings/interfaces/Block';
import { Store } from 'core';
interface MainProps extends BlockProps {
    user: User | null;
    store: Store<AppState>;
}
export default MainProps;
