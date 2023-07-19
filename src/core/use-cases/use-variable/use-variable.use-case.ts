import { IEnvironmentRepository } from '@/core/adapters/environment-repository/environment-repository.contract';
import { IMetadataRepository } from '@/core/adapters/metadata-repository/metadata-repository.contract';
import { IParser } from '@/core/adapters/parser/parser.contract';
import { TYPE_ENUM } from '@/core/adapters/parser/type-enum';
import { PropertieMetadata } from '@/core/domain/propertie-metadata.class';
import { TParsedValue } from '@/core/types/parsed-value.type';
import { IUseCase } from '../use-case.contract';

export class UseVariableUseCase implements IUseCase<Input, Output> {
  private readonly _validType = new Set<string>(Object.values(TYPE_ENUM));
  constructor(private readonly _dependencies: Dependencies) {}

  handle(input: Input): Output {
    const { environmentRepository, parser, metadataRepository } = this._dependencies;
    const { self, key, propertie, defaultValue } = input;
    const propertieMeta = new PropertieMetadata({ key, propertie, defaultValue });

    const raw = environmentRepository.get(key);
    if (!raw) return propertieMeta;

    const type = metadataRepository.getType(self, propertie);
    const value = parser.handle(raw, this._parseToTypeEnum(type));
    propertieMeta.addValue(value);

    return propertieMeta;
  }

  private _parseToTypeEnum(type: string): TYPE_ENUM {
    if (!this._validType.has(type)) throw new TypeError('');
    return type as TYPE_ENUM;
  }
}

type Input = { key: string; self: Object; propertie: string; defaultValue?: TParsedValue };
type Output = PropertieMetadata;
type Dependencies = {
  environmentRepository: IEnvironmentRepository;
  metadataRepository: IMetadataRepository;
  parser: IParser;
};
