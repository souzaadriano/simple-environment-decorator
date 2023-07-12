import { NumberArrayStrategy, StringArrayStrategy } from '@/core/use-cases/transform/strategies';
import { DecoratorFactory } from '@/factories/decorator.factory';

export const ToStringArray = DecoratorFactory.transform(StringArrayStrategy);
export const ToNumberArray = DecoratorFactory.transform(NumberArrayStrategy);
