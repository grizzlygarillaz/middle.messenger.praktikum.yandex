export default interface ButtonProps {
  label: string,
  type: string,
  onClick: () => void,
  events: Record<string, () => void>
}
