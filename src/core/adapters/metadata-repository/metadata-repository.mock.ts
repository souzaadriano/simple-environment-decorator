import { Mock } from '@/helpers/mock/mock.factory';
import { IMetadataRepository } from './metadata-repository.contract';

export const MetadataRepositoryMock = Mock.factory<IMetadataRepository>();

function fake(self: any, key: string) {}

export class Fake {
  @fake
  name: string;

  @fake
  num: number;

  @fake
  bool: boolean;

  @fake
  arr: string[];

  @fake
  obj: {};
}
