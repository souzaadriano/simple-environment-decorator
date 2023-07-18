import { TParsedValue } from '@/core/types/parsed-value.type';
import { IUseCase } from '../use-case.contract';
import { IValidateStrategy } from './strategies/validate.strategy.contract';
import { ValidationException } from './strategies/validate.strategy.exception';

export class ValidateUseCase implements IUseCase<Input, Output> {
  constructor(private readonly _dependencies: Dependencies) {}

  handle(input: Input): Output {
    const { strategy, value, key, propertie } = input;
    const payload = strategy.handle(value, key, propertie);

    if (!payload.status) throw new ValidationException(payload.message);
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
