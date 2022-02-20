import { UseEnvironmentVariableFactory } from '@/api/factories/UseEnvironmentVariable.factory';
import { Metadata } from '@/api/helpers/Metadata.helper';
export function Env(variableName?: string) {
  return (self: any, key: string) => {
    const metadata = Metadata.use(self, key);
    const useCase = UseEnvironmentVariableFactory.use();
    const { value } = useCase.execute({
      variableName: variableName ?? key.toUpperCase(),
      type: metadata.type,
    });

    Object.defineProperty(self, key, {
      value,
      writable: false,
    });
  };
}
