import { TransformUseCase } from '@/core/use-cases/transform/transform.use-case';

export abstract class TransformFactory {
  private static _instance: TransformUseCase;
  public static instance() {
    if (!TransformFactory._instance) {
      TransformFactory._instance = new TransformUseCase({});
    }

    return TransformFactory._instance;
  }
}
