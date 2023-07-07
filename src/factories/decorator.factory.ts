import { TParsedValue } from '@/core/types/parsed-value.type';
import { UseVariableFactory } from '@/factories/use-variable.factory';

export abstract class DecoratorFactory {
  private static _useVariable = UseVariableFactory.instance();

  static environmentFactory() {
    return function Environment(key: string, defaultValue?: TParsedValue) {
      return (self: any, propertie: string) => {
        const definition = DecoratorFactory._useVariable.handle({ key, self, propertie, defaultValue });
        Object.defineProperty(self, propertie, definition);
      };
    };
  }
}
