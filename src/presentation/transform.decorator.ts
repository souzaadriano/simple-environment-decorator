import { NumberArrayStrategy, StringArrayStrategy } from '@/core/use-cases/transform/strategies';
import { DecoratorFactory } from '@/factories/decorator.factory';

export const StringArray = DecoratorFactory.transformFactory(StringArrayStrategy);
export const NumberArray = DecoratorFactory.transformFactory(NumberArrayStrategy);
export const transformDecoratorFactory = DecoratorFactory.transformFactory;
