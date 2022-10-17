import BlockProps from 'typings/interfaces/Block';

export default interface ChatItemProps extends BlockProps {
  name: string,
  active: boolean,
  date: string,
  unread?: number,
  lastMessage?: {
    text: string,
    author?: string
  }
}
