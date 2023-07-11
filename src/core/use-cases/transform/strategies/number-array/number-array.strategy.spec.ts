import { NumberArrayStrategy } from './number-array.strategy';

describe('number-array.strategy', () => {
  let sut: NumberArrayStrategy;

  it('should tranform to number array', () => {
    sut = new NumberArrayStrategy(',');
    const result = sut.handle('1, 2, 3, 4');

    expect(result).toEqual([1, 2, 3, 4]);
    expect(result).toHaveLength(4);
  });

  it('should throw an error because an item is NaN', () => {
    sut = new NumberArrayStrategy(',');
    expect(() => sut.handle('1, 2, 3, a')).toThrow(TypeError);
  });
});
