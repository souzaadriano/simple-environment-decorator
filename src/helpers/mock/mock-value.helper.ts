export class MockValueHelper {
  private _once = false;
  constructor(private readonly _mock: jest.Mock) {}

  once(): this {
    this._once = true;
    return this;
  }

  return(value: any): this {
    this._once ? this._mock.mockReturnValueOnce(value) : this._mock.mockReturnValue(value);
    return this;
  }

  resolve(value: any): this {
    this._once ? this._mock.mockResolvedValueOnce(value) : this._mock.mockResolvedValue(value);
    return this;
  }

  reject(value: any): this {
    this._once ? this._mock.mockRejectedValueOnce(value) : this._mock.mockRejectedValue(value);
    return this;
  }

  implement(fn: (...parameters: any[]) => any): this {
    this._once ? this._mock.mockImplementationOnce(fn) : this._mock.mockImplementation(fn);
    return this;
  }
}
