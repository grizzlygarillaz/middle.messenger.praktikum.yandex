export default interface BlockProps {
  events?: Record<string, (arg: any) => void>,
  className?: string,
}
