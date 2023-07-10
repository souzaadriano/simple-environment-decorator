import { IEnvironmentRepository } from '@/core/adapters/environment-repository/environment-repository.contract';
import { IMetadataRepository } from '@/core/adapters/metadata-repository/metadata-repository.contract';
import { IParser } from '@/core/adapters/parser/parser.contract';
import { TYPE_ENUM } from '@/core/adapters/parser/type-enum';
import { TParsedValue } from '@/core/types/parsed-value.type';
import { IUseCase } from '../use-case.contract';
import { EnvironmentVariableNotDefined } from './use-variable.exception';

export class UseVariableUseCase implements IUseCase<Input, Output> {
  private readonly _validType = new Set<string>(Object.values(TYPE_ENUM));
  constructor(private readonly _dependencies: Dependencies) {}

  handle(input: Input): Output {
    const { environmentRepository, parser, metadataRepository } = this._dependencies;
    const { self, key, propertie, defaultValue } = input;

    const raw = environmentRepository.get(key);
    if (!raw) return this._useDefaultValue(key, propertie, defaultValue);

    const type = metadataRepository.getType(self, propertie);
    const value = parser.handle(raw, this._parseToTypeEnum(type));

    return { value, writable: false };
  }

  private _parseToTypeEnum(type: string): TYPE_ENUM {
    if (!this._validType.has(type)) throw new TypeError('');
    return type as TYPE_ENUM;
  }

  private _useDefaultValue(key: string, propertie: string, value?: TParsedValue): Output {
    if (!value) throw new EnvironmentVariableNotDefined(key, propertie);
    return { value, writable: false };
  }
}

type Input = { key: string; self: Object; propertie: string; defaultValue?: TParsedValue };
type Output = { writable: false; value: TParsedValue };
type Dependencies = {
  environmentRepository: IEnvironmentRepository;
  metadataRepository: IMetadataRepository;
  parser: IParser;
};
