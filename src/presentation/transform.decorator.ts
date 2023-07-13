import { NumberArrayStrategy, StringArrayStrategy } from '@/core/use-cases/transform/strategies';
import { DecoratorFactory } from '@/factories/decorator.factory';

/**
 * Decorator to transform a environment string variable to a array of strings
 * @decorator
 */
export const ToStringArray = DecoratorFactory.transform(StringArrayStrategy);

/**
 * Decorator to transform a environment number variable to a array of numbers
 * @decorator
 */
export const ToNumberArray = DecoratorFactory.transform(NumberArrayStrategy);
