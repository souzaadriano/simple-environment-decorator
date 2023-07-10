import { ITransformStrategy } from '../transform.strategy.contract';

export class NumberArrayStrategy implements ITransformStrategy<number[]> {
  private readonly _splitBy: string;
  constructor(splitBy?: string) {
    this._splitBy = splitBy ?? ';';
  }

  handle(value: string): number[] {
    const splited = value.split(this._splitBy);
    const result = splited.map((item) => Number(item.trim()));
    result.forEach((item, idx) => this._validateIsNaN(item, splited[idx]));
    return result;
  }

  private _validateIsNaN(value: number, originValue: string) {
    if (!Number.isNaN(value)) return;
    throw new TypeError(`item ${originValue} is not a number`);
  }
}
