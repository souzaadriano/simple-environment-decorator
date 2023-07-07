import { UseVariableFactory } from '@/factories/use-variable.factory';

export abstract class DecoratorFactory {
  private static _useVariable = UseVariableFactory.instance();

  static environmentFactory() {
    return function Environment(key: string) {
      return (self: any, propertie: string) => {
        const definition = DecoratorFactory._useVariable.handle({ key, self, propertie });
        Object.defineProperty(self, propertie, definition);
      };
    };
  }
}
