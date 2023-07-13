import { IValidateStrategy } from '../validate.strategy.contract';
import { ValidationException } from '../validate.strategy.exception';

export class OptionsStrategy<T> implements IValidateStrategy {
  private readonly _optionsSet: Set<T>;

  constructor(config: TStringOptionsConfig<T>) {
    const { options } = config;
    this._optionsSet = new Set(options);
  }

  handle(value: any, key: string, propertie: string): void {
    if (this._optionsSet.has(value)) return;

    throw new ValidationException(
      `Environment variable key ${key} propertie ${propertie} with value ${value} is not a valid option`,
    );
  }
}

type TStringOptionsConfig<T> = {
  options: T[];
};
