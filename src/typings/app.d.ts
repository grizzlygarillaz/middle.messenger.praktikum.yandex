declare global {
  export type Nullable<T> = T | null;

  export type KeyOf<T extends Record<string, unknown>> = keyof T;
  export type ValueOf<T extends Record<string, unknown>> = T[KeyOf<T>];

  export type AnyRecord = Record<string, any>;
}

export {};
