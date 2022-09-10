interface ButtonProps {
  label:string,
  onClick: () => void,
  events: Record<string, () => void>
  type:string,
}

export default ButtonProps;
