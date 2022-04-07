type Nullable<T = any> = T | null;

export interface IGetResponsePage<T = unknown> {
  count: number;
  results: T;
  next: Nullable<string>;
  previous: Nullable<string>;
}
