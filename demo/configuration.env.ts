import { Environment, ToNumberArray, ToStringArray } from '@/index';

export class Configuration {
  @Environment('TEXT')
  text: string;

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
