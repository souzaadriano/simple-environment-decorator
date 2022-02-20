import { EnvironmentType } from '@/core/contracts/Parser/EnvironmentType.enum';
import { Parser } from '@/core/contracts/Parser/Parser.contract';

export class ParserAdapter implements Parser {
  private static instance: ParserAdapter;

  private constructor() {}

  static create() {
    if (!this.instance) this.instance = new ParserAdapter();
    return this.instance;
  }

  handle(value: string, type: EnvironmentType.STRING): string;
  handle(value: string, type: EnvironmentType.NUMBER): number;
  handle(value: string, type: EnvironmentType.BOOLEAN): boolean;
  handle(value: string, type: EnvironmentType): string | number | boolean {
    switch (type) {
      case EnvironmentType.STRING:
        return value;
      case EnvironmentType.NUMBER:
        return this.toNumber(value);
      case EnvironmentType.BOOLEAN:
        return this.toBoolean(value);
      default:
        throw new RangeError(
          `invalid environment type, expected a string, number, or boolean and geted ${type}`,
        );
    }
  }

  private toNumber(value: string) {
    const payload = Number(value);
    if (!Number.isNaN(payload)) return payload;
    throw new TypeError(`value ${value} is not a number`);
  }

  private toBoolean(value: string) {
    return value.toUpperCase() === 'TRUE';
  }
}
