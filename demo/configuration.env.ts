import { Environment } from '@/index';

export class Configuration {
  @Environment('TEXT')
  text: string;

  @Environment('NUM')
  num: number;

  @Environment('BOOL')
  bool: boolean;
}
