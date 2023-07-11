import { IUseCase } from '../use-case.contract';
import { ITransformStrategy } from './strategies/transform.strategy.contract';

export class TransformUseCase implements IUseCase<Input, Output> {
  constructor(private readonly _dependencies: Dependencies) {}

  handle(input: Input): Output {
    const { strategy, value } = input;
    if (typeof value !== 'string') return { value };
    const result = strategy.handle(value);
    return { value: result };
  }
}

type Input = { value: string; strategy: ITransformStrategy };
type Output = { value: any };
type Dependencies = {};
