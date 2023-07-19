import { factory } from '@/presentation';
import { CustomTransformer } from './custom-transform.strategy';
import { CustomValidator } from './custom-validator.strategy';

export const CustomTransfomerDecorator = factory.transform(CustomTransformer);
export const CustomValidatorDecorator = factory.validate(CustomValidator);
