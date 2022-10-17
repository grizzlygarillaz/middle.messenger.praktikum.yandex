import { BlockProps } from 'core/Block';

export interface MessageProps extends BlockProps {
  own: boolean,
  date: string,
  author: string,
  data?: {
    text?: string,
    sticker?: SVGAElement,
    media?: File
  }
}
