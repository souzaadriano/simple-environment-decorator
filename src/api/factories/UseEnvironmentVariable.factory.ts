import { ProcessEnvironment } from '@/core/adapters/Environment/ProcessEnvironment.adapter';
import { ParserAdapter } from '@/core/adapters/Parser/Parser.adapter';
import { UseEnvironmentVariable } from '@/core/useCases/UseEnvironmentVariable/UseEnvironmentVariable.useCase';

export class UseEnvironmentVariableFactory {
  private static instance: UseEnvironmentVariable;
  private constructor() {}
  static use() {
    if (!this.instance) {
      this.instance = new UseEnvironmentVariable({
        environment: ProcessEnvironment.create(),
        parser: ParserAdapter.create(),
      });
    }

    return this.instance;
  }
}
