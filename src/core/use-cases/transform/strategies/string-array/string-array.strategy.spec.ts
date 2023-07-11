import { StringArrayStrategy } from './string-array.strategy';

describe('string-array.strategy', () => {
  let sut: StringArrayStrategy;

  it('should transform a string in array removing white spaces', () => {
    sut = new StringArrayStrategy({ splitBy: ',' });
    const result = sut.handle('a, b, c');
    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('should transform a string in array accepting white spaces', () => {
    sut = new StringArrayStrategy({ splitBy: ',', accpetWhiteSpaces: true });
    const result = sut.handle(' test a,test,test b');
    expect(result).toEqual([' test a', 'test', 'test b']);
  });
});
