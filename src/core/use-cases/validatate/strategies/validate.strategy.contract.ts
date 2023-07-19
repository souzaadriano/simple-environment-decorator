export interface IValidateStrategy<T = any> {
  handle(value: T, key: string, propertie: string): TValidatePayload;
}

export type TValidatePayload = { status: boolean; message: string };
