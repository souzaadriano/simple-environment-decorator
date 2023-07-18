import { ValidateUseCase } from '@/core/use-cases/validatate/validate.use-case';

export abstract class ValidatorFactory {
  private static _instance: ValidateUseCase;
  public static instance() {
    if (!ValidatorFactory._instance) {
      ValidatorFactory._instance = new ValidateUseCase({});
    }

    return ValidatorFactory._instance;
  }
}
