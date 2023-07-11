import { TYPE_ENUM } from './type-enum';

export interface IParser {
  handle(value: string, type: TYPE_ENUM.STRING): string;
  handle(value: string, type: TYPE_ENUM.ARRAY): string;
  handle(value: string, type: TYPE_ENUM.OBJECT): string;
  handle(value: string, type: TYPE_ENUM.NUMBER): number;
  handle(value: string, type: TYPE_ENUM.BOOLEAN): boolean;
  handle(value: string, type: TYPE_ENUM): string | number | boolean;
}
