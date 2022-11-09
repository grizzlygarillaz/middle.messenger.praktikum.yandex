import BlockProps from 'typings/interfaces/Block';

export default interface ButtonProps extends BlockProps {
  label: string,
  type: string,
  onClick: () => void,
  theme?: ComponentTheme,
  size?: ComponentSize,
}
