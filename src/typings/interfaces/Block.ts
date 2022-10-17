import Block from 'core/Block';

export default interface BlockProps {
  events?: Record<string, (arg: unknown) => void>,
  className?: string,
  icons?: Record<string, SVGAElement>
  children?: Record<string, Block>
}
