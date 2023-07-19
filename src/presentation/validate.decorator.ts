import { OptionsStrategy } from '@/core/use-cases/validatate/strategies/options/options.strategy';
import { DecoratorFactory } from '../factories/decorator.factory';

/**
 * Decorator to validate if environment variable is in available options
 * @decorator
 * @param {object} config
 */
export const Option = DecoratorFactory.validator(OptionsStrategy);
