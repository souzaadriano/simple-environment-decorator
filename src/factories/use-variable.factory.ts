import { EnvironmentRepository } from '@/core/adapters/environment-repository/environment-repository.adapter';
import { MetadataRepository } from '@/core/adapters/metadata-repository/metadata-repository.adapter';
import { Parser } from '@/core/adapters/parser/parser.adapter';
import { UseVariableUseCase } from '@/core/use-cases/use-variable.use-case';

export abstract class UseVariableFactory {
  private static _instance: UseVariableUseCase;

  public static instance() {
    if (!UseVariableFactory._instance) {
      UseVariableFactory._instance = new UseVariableUseCase({
        environmentRepository: new EnvironmentRepository(),
        metadataRepository: new MetadataRepository(),
        parser: new Parser(),
      });
    }

    return UseVariableFactory._instance;
  }
}
