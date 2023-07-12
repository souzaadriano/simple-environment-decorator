import { NumberArrayStrategy, StringArrayStrategy } from '@/core/use-cases/transform/strategies';
import { DecoratorFactory } from '@/factories/decorator.factory';

export const ToStringArray = DecoratorFactory.transformFactory(StringArrayStrategy);
export const ToNumberArray = DecoratorFactory.transformFactory(NumberArrayStrategy);
export const transformDecoratorFactory = DecoratorFactory.transformFactory;
