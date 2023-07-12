import { TParsedValue } from '@/core/types/parsed-value.type';
import { ITransformStrategy } from '@/core/use-cases/transform/strategies';
import { IValidateStrategy } from '@/core/use-cases/validatate/strategies/validate.strategy.contract';
import { ClassConstructor } from '@/helpers/class-constructor.type';
import { TransformFactory } from './transform.factory';
import { UseVariableFactory } from './use-variable.factory';
import { ValidatorFactory } from './validator.factory';

export abstract class DecoratorFactory {
  private static _transform = TransformFactory.instance();
  private static _validator = ValidatorFactory.instance();
  private static _useVariable = UseVariableFactory.instance();

  static transform<T, K>(Strategy: ClassConstructor<ITransformStrategy, K>) {
    return (config: K) => (self: any, propertie: string) => {
      const { value } = DecoratorFactory._transform.handle({
        value: self[propertie],
        strategy: new Strategy(config),
      });
      Object.defineProperty(self, propertie, { value, writable: true });
    };
  }

  static environmentFactory() {
    return function Environment(key: string, defaultValue?: TParsedValue) {
      return (self: any, propertie: string) => {
        const definition = DecoratorFactory._useVariable.handle({ key, self, propertie, defaultValue });
        Object.defineProperty(self, propertie, definition);
        Object.defineProperty(self, `_${propertie}`, { value: key, enumerable: false, writable: false });
      };
    };
  }

  static validator<T, K>(Strategy: ClassConstructor<IValidateStrategy, K>) {
    return (config: K) => (self: any, propertie: string) => {
      const { key, value } = DecoratorFactory.propertieData(self, propertie);
      DecoratorFactory._validator.handle({ key, value, propertie, strategy: new Strategy(config) });
    };
  }

  static propertieData(self: any, propertie: string) {
    const key = self[`_${propertie}`];
    const value = self[propertie];
    return { key, value };
  }
}
