import MessageProps from 'components/Message/type';

export default interface ChatProps {
  current_chat: string,
  messages: MessageProps[]
}
