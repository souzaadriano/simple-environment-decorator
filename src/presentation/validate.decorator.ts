import { OptionsStrategy } from '@/core/use-cases/validatate/strategies/options/options.strategy';
import { DecoratorFactory } from '../factories/decorator.factory';

export const Option = DecoratorFactory.validator(OptionsStrategy);
