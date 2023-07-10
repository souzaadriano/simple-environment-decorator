export interface ITransformStrategy<T> {
  handle(value: string): T;
}
