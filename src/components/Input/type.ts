import BlockProps from 'typings/interfaces/Block';
import Rule from '../../typings/interfaces/Rule';

export interface InputProps extends Rule, BlockProps {
  type: string,
  name: string,
  placeholder: string,
  title: string,
  required: boolean,
  valid: boolean,
  value: string,
}
