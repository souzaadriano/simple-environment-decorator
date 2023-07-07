import { IEnvironmentRepository } from '../adapters/environment-repository/environment-repository.contract';
import { IMetadataRepository } from '../adapters/metadata-repository/metadata-repository.contract';
import { IParser } from '../adapters/parser/parser.contract';
import { TYPE_ENUM } from '../domain/type-enum';
import { IUseCase } from './use-case.contract';

export class UseVariableUseCase implements IUseCase<Input, Output> {
  private readonly _validType = new Set<string>(Object.values(TYPE_ENUM));
  constructor(private readonly _dependencies: Dependencies) {}

  handle(input: Input): Output {
    const { environmentRepository, parser, metadataRepository } = this._dependencies;
    const { self, key, propertie } = input;
    const raw = environmentRepository.get(key);
    const type = metadataRepository.getType(self, propertie);
    const value = parser.handle(raw, this._parseToTypeEnum(type));

    return { value, writable: false };
  }

  private _parseToTypeEnum(type: string): TYPE_ENUM {
    if (!this._validType.has(type)) throw new TypeError('');
    return type as TYPE_ENUM;
  }
}

type Input = { key: string; self: Object; propertie: string };
type Output = { writable: false; value: string | number | boolean };
type Dependencies = {
  environmentRepository: IEnvironmentRepository;
  metadataRepository: IMetadataRepository;
  parser: IParser;
};
