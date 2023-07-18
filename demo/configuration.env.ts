import { Environment, Option, ToNumberArray, ToStringArray } from '@/index';

export class Configuration {
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
}
