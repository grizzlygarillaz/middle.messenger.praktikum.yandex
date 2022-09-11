interface ChatItemProps {
  name: string,
  active: boolean,
  date: string,
  unread?: number,
  lastMessage?: {
    text: string,
    author?: string
  }
}

export default ChatItemProps;
