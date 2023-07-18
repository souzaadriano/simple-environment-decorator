import { OptionsStrategy } from '@/core/use-cases/validatate/strategies/options/options.strategy';
import { DecoratorFactory } from '../factories/decorator.factory';

/**
 * Decorator to validate if environment variable is in available options
 * @decorator
 */
export const Option = DecoratorFactory.validator(OptionsStrategy);
