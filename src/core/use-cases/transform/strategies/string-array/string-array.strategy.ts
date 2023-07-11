import { ITransformStrategy } from '../transform.strategy.contract';

export class StringArrayStrategy implements ITransformStrategy<string[]> {
  private readonly _config: TStringArrayConfig;

  constructor(config: TStringArrayConfig) {
    this._config = config ?? { accpetWhiteSpaces: false, splitBy: ';' };
  }

  handle(value: string): string[] {
    const { accpetWhiteSpaces, splitBy } = this._config;
    const result = value.split(splitBy);
    return accpetWhiteSpaces ? result : result.map((value) => value.replaceAll(' ', ''));
  }
}

export type TStringArrayConfig = {
  splitBy: string;
  accpetWhiteSpaces?: boolean;
};
