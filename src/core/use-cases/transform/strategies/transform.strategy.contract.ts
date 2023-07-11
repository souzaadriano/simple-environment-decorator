export interface ITransformStrategy<T = any> {
  handle(value: string): T;
}
