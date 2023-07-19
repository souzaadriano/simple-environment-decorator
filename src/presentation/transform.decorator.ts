import { NumberArrayStrategy, StringArrayStrategy } from '@/core/use-cases/transform/strategies';
import { DecoratorFactory } from '@/factories/decorator.factory';

/**
 * Decorator to transform a environment string variable to a array of strings
 * @decorator
 * @param {object} config
 * @example ENV_NAME=a;b;c to Array ['a', 'b', 'c']
 */
export const ToStringArray = DecoratorFactory.transform(StringArrayStrategy);

/**
 * Decorator to transform a environment number variable to a array of numbers
 * @decorator
 * @param {object} config
 * @example ENV_NAME=1,3,4,5,6 to Array [1, 2, 3, 4, 5, 6]
 */
export const ToNumberArray = DecoratorFactory.transform(NumberArrayStrategy);
