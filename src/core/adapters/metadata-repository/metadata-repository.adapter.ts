import 'reflect-metadata';
import { IMetadataRepository } from './metadata-repository.contract';

export class MetadataRepository implements IMetadataRepository {
  getType<T extends Object>(self: T, key: string): string {
    const data = Reflect.getMetadata('design:type', self, key);
    return data.name;
  }
}
