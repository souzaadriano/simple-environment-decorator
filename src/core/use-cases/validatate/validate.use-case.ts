import { TParsedValue } from '@/core/types/parsed-value.type';
import { IUseCase } from '../use-case.contract';
import { IValidateStrategy } from './strategies/validate.strategy.contract';

export class ValidateUseCase implements IUseCase<Input, Output> {
  constructor(private readonly _dependencies: Dependencies) {}

  handle(input: Input): Output {
    const { strategy, value, key, propertie } = input;
    strategy.handle(value, key, propertie);
  }
}

type Input = {
  value: TParsedValue;
  key: string;
  propertie: string;
  strategy: IValidateStrategy;
};

type Output = void;

type Dependencies = {};
