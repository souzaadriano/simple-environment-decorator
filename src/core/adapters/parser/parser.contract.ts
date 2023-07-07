import { TYPE_ENUM } from '@/core/domain/type-enum';

export interface IParser {
  handle(value: string, type: TYPE_ENUM.STRING): string;
  handle(value: string, type: TYPE_ENUM.NUMBER): number;
  handle(value: string, type: TYPE_ENUM.BOOLEAN): boolean;
  handle(value: string, type: TYPE_ENUM): string | number | boolean;
}
