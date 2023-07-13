import { TParsedValue } from '@/core/types/parsed-value.type';

export interface IValidateStrategy {
  handle(value: TParsedValue, key: string, propertie: string): void;
}
