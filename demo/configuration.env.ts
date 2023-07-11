import { Environment } from '@/index';
import { NumberArray, StringArray } from '@/presentation/transform.decorator';

export class Configuration {
  @Environment('TEXT')
  text: string;

  @Environment('NUM')
  num: number;

  @Environment('BOOL')
  bool: boolean;

  @StringArray({ splitBy: ',' })
  @Environment('TEXT_ARR')
  textArray: string[];

  @NumberArray({ splitBy: ',' })
  @Environment('NUM_ARR')
  numberArray: number[];
}
