import { ProcessEnvironment } from '@/core/adapters/Environment/ProcessEnvironment.adapter';
import { ParserAdapter } from '@/core/adapters/Parser/Parser.adapter';
import { EnvironmentType } from '@/core/contracts/Parser/EnvironmentType.enum';
import { UseEnvironmentVariable } from './UseEnvironmentVariable.useCase';

describe('UseCase: UseEnvironmentVariable', () => {
  const sut = new UseEnvironmentVariable({
    environment: ProcessEnvironment.create(),
    parser: ParserAdapter.create(),
  });

  beforeAll(() => {
    process.env.STRING_EXAMPLE_1 = 'EXAMPLE';
    process.env.NUMBER_EXAMPLE_1 = '1';
    process.env.NUMBER_EXAMPLE_2 = '3.14';
    process.env.NUMBER_EXAMPLE_3 = '-4';
    process.env.BOOLEAN_EXAMPLE_1 = 'TRUE';
    process.env.BOOLEAN_EXAMPLE_2 = 'FALSE';
  });

  it('should be return a string to success', () => {
    const result = sut.execute({
      type: EnvironmentType.STRING,
      variableName: 'STRING_EXAMPLE_1',
    });

    expect(result.value).toBe('EXAMPLE');
  });

  it('should be return a number to success', () => {
    const first = sut.execute({
      type: EnvironmentType.NUMBER,
      variableName: 'NUMBER_EXAMPLE_1',
    });

    const second = sut.execute({
      type: EnvironmentType.NUMBER,
      variableName: 'NUMBER_EXAMPLE_2',
    });

    const third = sut.execute({
      type: EnvironmentType.NUMBER,
      variableName: 'NUMBER_EXAMPLE_3',
    });

    expect(first.value).toBe(1);
    expect(second.value).toBe(3.14);
    expect(third.value).toBe(-4);
  });

  it('should be return a boolean to success', () => {
    const first = sut.execute({
      type: EnvironmentType.BOOLEAN,
      variableName: 'BOOLEAN_EXAMPLE_1',
    });

    const second = sut.execute({
      type: EnvironmentType.BOOLEAN,
      variableName: 'BOOLEAN_EXAMPLE_2',
    });

    expect(first.value).toBe(true);
    expect(second.value).toBe(false);
  });

  it('should be throw an TypeError', () => {
    try {
      sut.execute({
        type: EnvironmentType.NUMBER,
        variableName: 'STRING_EXAMPLE_1',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });

  it('should be throw an TypeError', () => {
    try {
      sut.execute({
        type: EnvironmentType.STRING,
        variableName: 'ABC',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(EvalError);
    }
  });
});
