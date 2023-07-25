import { AbstractConfiguration, Environment, Option, ToNumberArray, ToStringArray } from '../src';
import { CustomTransfomerDecorator, CustomValidatorDecorator } from './custom-decorators';

export class Configuration extends AbstractConfiguration {
  @CustomValidatorDecorator({ customOption: ['homol'] })
  @Environment('NODE_ENV', 'local')
  nodeEnv: string;

  @Option({ options: ['adriano'] })
  @Environment('TEXT')
  text: string;

  @Option({ options: [5] })
  @Environment('NUM')
  num: number;

  @Environment('BOOL')
  bool: boolean;

  @ToStringArray({ splitBy: ',' })
  @Environment('TEXT_ARR')
  textArray: string[];

  @ToNumberArray({ splitBy: ',' })
  @Environment('NUM_ARR')
  numberArray: number[];

  @CustomTransfomerDecorator({ encodeType: 'base64' })
  @Environment('ENCODED_NAME')
  encodedName: string;
}
