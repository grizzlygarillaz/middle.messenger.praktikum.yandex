import { MessageProps } from 'components/Message/type';
import BlockProps from 'typings/interfaces/Block';

export default interface ChatProps extends BlockProps {
  current_chat: string,
  messages: MessageProps[]
}
