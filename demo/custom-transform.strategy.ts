import { ITransformStrategy } from '@/index';

export class CustomTransformer implements ITransformStrategy<string, string> {
  constructor(private readonly _config: TCustomTransformerConfig) {}

  handle(value: string): string {
    const { encodeType } = this._config;
    return Buffer.from(value).toString(encodeType);
  }
}

type TCustomTransformerConfig = {
  encodeType: 'hex' | 'base64';
};
