import Block from 'core/Block';

export default interface BlockProps {
  className?: string,
  loading?: boolean
  events?: Record<string, (arg?: unknown) => void>,
  icons?: Record<string, any>
  children?: Record<string, Block>,
  ref?: string,
}
