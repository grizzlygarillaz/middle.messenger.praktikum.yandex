export {
  isEqual,
  isPlainObject,
  isArray,
  isArrayOrObject,
  set,
  merge,
  PlainObject,
  objectToCamelCase,
  pad,
  padTime,
};

type PlainObject = Record<string, any>;

function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === 'object'
    && value !== null
    && value.constructor === Object
    && Object.prototype.toString.call(value) === '[object Object]';
}

function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is ([] | PlainObject) {
  return isArray(value) || isPlainObject(value);
}

function isEqual(lhs: PlainObject, rhs: PlainObject): boolean {
  if (lhs === rhs) {
    return true;
  }

  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  return Object
    .entries(lhs)
    .every(([key, value]) => {
      const rightValue = rhs[key];

      if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
        return isEqual(value as PlainObject, rightValue as PlainObject);
      }

      return value === rightValue;
    });
}

function merge(lhs: PlainObject, rhs: PlainObject): PlainObject {
  if (!rhs) {
    return lhs;
  }
  Object
    .keys(rhs)
    .forEach((key) => {
      if (!rhs.hasOwnProperty(key)) {
        return;
      }
      try {
        if (rhs[key].constructor === Object) {
          rhs[key] = merge(lhs[key] as PlainObject, rhs[key] as PlainObject);
        } else {
          lhs[key] = rhs[key];
        }
      } catch (e) {
        lhs[key] = rhs[key];
      }
    });

  return lhs;
}

function set(object: PlainObject | unknown, path: string, value: unknown): PlainObject | unknown {
  if (typeof object !== 'object') {
    return object;
  }

  const pathObject = path
    .split('.')
    .reduceRight((acc: PlainObject, key): PlainObject => ({
      [key as string]: acc,
    }), value as any);

  return merge(object as PlainObject, pathObject as PlainObject);
}

function objectToCamelCase(object: PlainObject) {
  if (!object) {
    return object;
  }
  Object.keys(object).forEach((key) => {
    if (object[key] && typeof object[key] === 'object') {
      object[key] = objectToCamelCase(object[key] as PlainObject);
    }

    const newKey = key.split(/[_\-\s]/)
      .filter((word) => word.length)
      .reduce((acc, word, currentIndex) => {
        const newWord = currentIndex ? word.charAt(0).toUpperCase() + word.slice(1) : word;

        return acc + newWord;
      }, '');

    if (newKey !== key) {
      object[newKey] = object[key];
      delete object[key];
    }
  });

  return object;
}

function pad(value: number) {
  if (value < 10) {
    return `0${value}`;
  }
  return value;
}

function padTime(time: string) {
  const date = new Date(time);

  const minutes = pad(date.getMinutes());

  return `${date.getHours()}:${minutes}`;
}
