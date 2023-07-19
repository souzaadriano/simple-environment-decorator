export interface ITransformStrategy<INPUT = any, OUTPUT = any> {
  handle(value: INPUT): OUTPUT;
}
