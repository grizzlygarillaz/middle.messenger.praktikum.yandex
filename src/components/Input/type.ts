import Rule from '../../typings/interfaces/Rule';

export interface InputProps extends Rule {
  type: string,
  name: string,
  placeholder: string,
  title: string,
  required: boolean,
  className: string,
  valid: boolean,
  value: string,
  events: Record<string, () => void>
}
