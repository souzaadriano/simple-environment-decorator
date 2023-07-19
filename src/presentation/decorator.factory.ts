import { ITransformStrategy, IValidateStrategy } from '..';
import { DecoratorFactory } from '../factories/decorator.factory';

export const factory = {
  /**
   * Factory to create a transform decorator.
   * @factory
   * @param { ITransformStrategy } Strategy - A Strategy Class
   */
  transform: DecoratorFactory.transform,

  /**
   * Factory to create a validator decorator.
   * @factory
   * @param { IValidateStrategy } Strategy - A Strategy Class
   */
  validate: DecoratorFactory.validator,
};
