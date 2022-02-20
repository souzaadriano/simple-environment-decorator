import { Environment } from '@/core/contracts/Environment/Environment.contract';
import { EnvironmentType } from '@/core/contracts/Parser/EnvironmentType.enum';
import { Parser } from '@/core/contracts/Parser/Parser.contract';
import Dependencies = UseEnvironmentVariable.Dependencies;
import Recipe = UseEnvironmentVariable.Recipe;
import Payload = UseEnvironmentVariable.Payload;

export class UseEnvironmentVariable {
  constructor(private readonly dependencies: Dependencies) {}
  execute(recipe: Recipe): Payload {
    const { environment, parser } = this.dependencies;
    const stringValue = environment.get(recipe.variableName);
    const value = parser.handle(stringValue, recipe.type as EnvironmentType);
    return { key: recipe.variableName, value };
  }
}

export namespace UseEnvironmentVariable {
  export type Dependencies = {
    environment: Environment;
    parser: Parser;
  };
  export type Payload = {
    key: string;
    value: string | number | boolean;
  };
  export type Recipe = { variableName: string; type: string };
}
