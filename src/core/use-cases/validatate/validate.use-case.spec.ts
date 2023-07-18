import { ValidationException } from './strategies/validate.strategy.exception';
import { ValidateUseCase } from './validate.use-case';

describe('validate.use-case', () => {
  let sut: ValidateUseCase;

  const strategyHandler = jest.fn().mockImplementation((value: any, key: string, propertie: string) => {
    if (value === 'test') return { status: true, message: 'success' };
    return { status: false, message: 'failed because value is not a "test"' };
  });

  beforeEach(() => {
    sut = new ValidateUseCase({});
  });

  it('should pass a validation of value', () => {
    const input = { key: 'TEST', propertie: 'test', value: 'test' };
    sut.handle({
      key: input.key,
      propertie: input.propertie,
      value: input.value,
      strategy: { handle: strategyHandler },
    });

    expect(strategyHandler).toHaveBeenCalledTimes(1);
    expect(strategyHandler).toBeCalledWith(input.value, input.key, input.propertie);
  });

  it('should throw and error because is not a valid value', () => {
    const input = { key: 'TEST', propertie: 'test', value: 'abc', strategy: { handle: strategyHandler } };

    expect(() => sut.handle(input)).toThrow(ValidationException);
  });
});
