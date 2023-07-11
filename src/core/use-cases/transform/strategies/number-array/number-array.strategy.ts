import { ITransformStrategy } from '../transform.strategy.contract';

export class NumberArrayStrategy implements ITransformStrategy<number[]> {
  private readonly _options: TNumberArrayOptions;

  constructor(options: TNumberArrayOptions) {
    this._options = options ?? { splitBy: ';' };
  }

  handle(value: string): number[] {
    const { splitBy } = this._options;
    const splited = value.split(splitBy);
    const result = splited.map((item) => Number(item.trim()));
    result.forEach((item, idx) => this._validateIsNaN(item, splited[idx]));
    return result;
  }

  private _validateIsNaN(value: number, originValue: string) {
    if (!Number.isNaN(value)) return;
    throw new TypeError(`item ${originValue} is not a number`);
  }
}

export type TNumberArrayOptions = {
  splitBy: string;
};
