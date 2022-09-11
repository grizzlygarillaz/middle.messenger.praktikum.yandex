import Rule from '../typings/interfaces/rule';

interface RegexParse {
  body: string,
  options?: string
}

function Validator(value: string, rule: Rule = {}): boolean {
  const isRegex = /^\/(?<body>\S+)\/(?<options>[gmiysud]*)$/;
  if (value) {
    if (rule.maxLength !== undefined && value.length > rule.maxLength) {
      return false;
    }
    if (rule.minLength !== undefined && value.length < rule.minLength) {
      return false;
    }
  }

  const { regex } = rule;

  if (regex !== undefined) {
    const query: RegexParse = isRegex.test(regex) ? (isRegex.exec(regex)!.groups as {} as RegexParse) : { body: regex, options: '' };
    return new RegExp(query.body, query?.options).test(value);
  }

  return true;
}

export default Validator;
