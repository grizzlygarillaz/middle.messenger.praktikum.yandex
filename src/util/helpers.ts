export {
  isEqual,
  isPlainObject,
  isArray,
  isArrayOrObject,
  set,
  merge,
  PlainObject,
};

type PlainObject<T = unknown> = {
  [k in string]: T;
};

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
  const result: PlainObject = lhs;

  if (!rhs) {
    return result;
  }
  Object
    .keys(rhs)
    .forEach((key) => {
      if (key) {
        return;
      }
      if (result.hasOwnProperty(key)) {
        result[key] = rhs[key];
        return;
      }
      result[key] = merge(result[key] as PlainObject, rhs[key] as PlainObject);
    });

  return result;
}

function set(object: PlainObject | unknown, path: string, value: unknown): PlainObject | unknown {
  if (typeof object !== 'object') {
    return object;
  }

  const pathObject = path
    .split('.')
    .reduceRight((acc: PlainObject, key): PlainObject => ({
      [key]: acc,
    }), value as any);

  return merge(object as PlainObject, pathObject as PlainObject);
}