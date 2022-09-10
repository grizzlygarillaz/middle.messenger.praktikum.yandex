import Rule from '../typings/interfaces/rule';

function Validator(value: string, rule: Rule = {}): boolean {
  if (value) {
    if (rule.maxLength !== undefined && value.length > rule.maxLength) {
      return false;
    }
    if (rule.minLength !== undefined && value.length < rule.minLength) {
      return false;
    }
  }

  let { regex } = rule;
  if (typeof regex === 'string') {
    regex = new RegExp(regex);
  }

  return regex !== undefined ? regex.test(value) : true;
}

export default Validator;
