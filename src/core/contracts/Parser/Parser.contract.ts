import { EnvironmentType } from './EnvironmentType.enum';

export interface Parser {
  handle(value: string, type: EnvironmentType.STRING): string;
  handle(value: string, type: EnvironmentType.NUMBER): number;
  handle(value: string, type: EnvironmentType.BOOLEAN): boolean;
  handle(value: string, type: EnvironmentType): string | number | boolean;
}
