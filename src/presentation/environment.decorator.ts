import { DecoratorFactory } from '@/factories/decorator.factory';

/**
 * Decorator to get environment variables
 * @decorator
 * @param {string} key environment variable name
 * @param {any | undefined} [defaultValue] (optional) default value in case not exists on environment variables
 */
export const Environment = DecoratorFactory.environmentFactory();
