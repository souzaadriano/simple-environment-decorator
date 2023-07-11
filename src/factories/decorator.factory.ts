import { TParsedValue } from '@/core/types/parsed-value.type';
import { ITransformStrategy } from '@/core/use-cases/transform/strategies';
import { UseVariableFactory } from '@/factories/use-variable.factory';
import { ClassConstructor } from '@/helpers/class-constructor.type';
import { TransformFactory } from './transform.factory';

export abstract class DecoratorFactory {
  private static _useVariable = UseVariableFactory.instance();
  private static _transform = TransformFactory.instance();

  static environmentFactory() {
    return function Environment(key: string, defaultValue?: TParsedValue) {
      return (self: any, propertie: string) => {
        const definition = DecoratorFactory._useVariable.handle({ key, self, propertie, defaultValue });
        Object.defineProperty(self, propertie, definition);
      };
    };
  }

  static transformFactory<T, K>(Strategy: ClassConstructor<ITransformStrategy, K>) {
    return (config: K) => (self: any, propertie: string) => {
      const { value } = DecoratorFactory._transform.handle({
        value: self[propertie],
        strategy: new Strategy(config),
      });
      Object.defineProperty(self, propertie, { value, writable: true });
    };
  }
}
