interface ButtonProps {
  label: string,
  type: string,
  onClick: () => void,
  events: Record<string, () => void>
}

export default ButtonProps;
