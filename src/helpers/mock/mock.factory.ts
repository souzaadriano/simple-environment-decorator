import { mock } from 'jest-mock-extended';
import { MockValueHelper } from './mock-value.helper';

export class Mock<T> {
  private constructor(private readonly _mock: any) {}

  static factory<T>(base?: Record<keyof T, jest.Mock>) {
    const mocked: any = mock<T>();
    if (base) for (const key in base) mocked[key] = base[key];
    return new Mock<T>(mock);
  }

  override(key: keyof T): MockValueHelper {
    this._mock[key] = jest.fn();
    return new MockValueHelper(this._mock[key]);
  }

  get(): T {
    return this._mock;
  }
}
