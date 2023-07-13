import { DecoratorFactory } from '../factories/decorator.factory';

export const factory = {
  /**
   * Factory to create a transform decorator.
   * @factory
   */
  transform: DecoratorFactory.transform,

  /**
   * Factory to create a validator decorator.
   * @factory
   */
  validate: DecoratorFactory.validator,
};
