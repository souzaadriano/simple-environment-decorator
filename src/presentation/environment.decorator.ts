import { DecoratorFactory } from '@/factories/decorator.factory';

/**
 * Decorator to access environment variables in a class.
 * @param {string} key - The key of the environment variable to be accessed.
 * @param {TParsedValue} [defaultValue] - Default value to be used if the environment variable is not defined.
 * @returns {PropertyDecorator} The decorator for the class property.
 */
export const Environment = DecoratorFactory.environmentFactory();
