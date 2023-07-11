import { Singleton } from '@/helpers/singleton.decorator';
import { IParser } from './parser.contract';
import { TYPE_ENUM } from './type-enum';

@Singleton
export class Parser implements IParser {
  handle(value: string, type: TYPE_ENUM.STRING): string;
  handle(value: string, type: TYPE_ENUM.ARRAY): string;
  handle(value: string, type: TYPE_ENUM.OBJECT): string;
  handle(value: string, type: TYPE_ENUM.NUMBER): number;
  handle(value: string, type: TYPE_ENUM.BOOLEAN): boolean;
  handle(value: string, type: TYPE_ENUM): string | number | boolean {
    switch (type) {
      case TYPE_ENUM.STRING:
        return value;
      case TYPE_ENUM.NUMBER:
        return this._toNumber(value);
      case TYPE_ENUM.BOOLEAN:
        return this._toBoolean(value);
      case TYPE_ENUM.ARRAY:
        return value;
      case TYPE_ENUM.OBJECT:
        return value;
      default:
        throw new RangeError(`invalid environment type, expected a string, number, or boolean and geted ${type}`);
    }
  }

  private _toNumber(value: string) {
    const payload = Number(value);
    if (!Number.isNaN(payload)) return payload;
    throw new TypeError(`value ${value} is not a number`);
  }

  private _toBoolean(value: string) {
    return value.toUpperCase() === 'TRUE';
  }
}
