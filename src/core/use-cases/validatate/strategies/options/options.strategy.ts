import { IValidateStrategy, TValidatePayload } from '../validate.strategy.contract';

export class OptionsStrategy<T> implements IValidateStrategy {
  private readonly _optionsSet: Set<T>;

  constructor(config: TStringOptionsConfig<T>) {
    const { options } = config;
    this._optionsSet = new Set(options);
  }

  handle(value: any, key: string, propertie: string): TValidatePayload {
    if (this._optionsSet.has(value)) return { status: true, message: 'success' };

    return {
      status: false,
      message: `Environment variable key ${key} propertie ${propertie} with value ${value} is not a valid option`,
    };
  }
}

type TStringOptionsConfig<T> = {
  options: T[];
};
