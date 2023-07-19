import { IValidateStrategy, TValidatePayload } from '@/index';

export class CustomValidator implements IValidateStrategy<string> {
  private _nodeEnv = new Set(['local', 'development', 'production']);

  constructor(config: TCustomValidatorConfig) {
    if (config.customOption) config.customOption.forEach((option) => this._nodeEnv.add(option));
  }

  handle(value: string, key: string, propertie: string): TValidatePayload {
    const status = this._nodeEnv.has(value);
    if (status) return { message: 'success', status: true };

    return {
      message: `Invalid ${key} must be 'local', 'development', 'production' and getted ${value} on propertie ${propertie}`,
      status: false,
    };
  }
}

export type TCustomValidatorConfig = {
  customOption?: string[];
};
