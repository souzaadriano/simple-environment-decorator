import { PropertieMetadata } from '@/core/domain/propertie-metadata.class';
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

  /**
   * Factory to create a transform decorator.
   * @factory
   */
  static transform<T, K>(Strategy: ClassConstructor<ITransformStrategy, K>) {
    return (config: K) => (self: any, propertie: string) => {
      const propertieMeta = PropertieMetadata.extract(self, propertie);
      const { value } = DecoratorFactory._transform.handle({
        value: self[propertie],
        strategy: new Strategy(config),
        isDefault: propertieMeta.isDefault,
      });

      propertieMeta.addTransformer(Strategy.name);
      Object.defineProperty(self, propertie, { value, writable: true });
    };
  }

  static environmentFactory() {
    return function Environment(key: string, defaultValue?: TParsedValue) {
      return (self: any, propertie: string) => {
        const propertieMeta = DecoratorFactory._useVariable.handle({ key, self, propertie, defaultValue });
        Object.defineProperty(self, propertie, propertieMeta.definition());
        self[`__meta`]
          ? self[`__meta`].set(propertie, propertieMeta)
          : Object.defineProperty(self, `__meta`, {
              value: new Map<string, PropertieMetadata>([[propertie, propertieMeta]]),
              enumerable: false,
              writable: false,
            });
      };
    };
  }

  /**
   * Factory to create a validator decorator.
   * @factory
   */
  static validator<T, K>(Strategy: ClassConstructor<IValidateStrategy, K>) {
    return (config: K) => (self: any, propertie: string) => {
      const propertieMeta = PropertieMetadata.extract(self, propertie);
      DecoratorFactory._validator.handle({
        key: propertieMeta.key,
        value: propertieMeta.value,
        propertie,
        strategy: new Strategy(config),
      });

      propertieMeta.addValidator(Strategy.name);
    };
  }
}
