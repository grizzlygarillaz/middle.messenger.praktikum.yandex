import Rule from '../typings/interfaces/Rule';

interface RegexParse {
  body: string,
  options?: string
}

function Validator(value: string, rule: Rule = {}): boolean {
  const { maxLength, minLength, regex } = rule;

  const isRegex = /^\/(?<body>\S+)\/(?<options>[gmiysud]*)$/;

  if (maxLength !== undefined && value.length > maxLength) {
    return false;
  }

  if (minLength !== undefined && value.length < minLength) {
    return false;
  }

  if (regex !== undefined) {
    const query: RegexParse = isRegex.test(regex) ? (isRegex.exec(regex)!.groups as {} as RegexParse) : { body: regex, options: '' };
    return new RegExp(query.body, query?.options).test(value);
  }

  return true;
}

export default Validator;
