export interface IUseCase<INPUT, OUTPUT> {
  handle(input: INPUT): OUTPUT;
}
