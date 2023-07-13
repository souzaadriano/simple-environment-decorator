import { OptionsStrategy } from './options.strategy';

describe('options.strategy', () => {
  let sut: OptionsStrategy<any>;

  describe('test option using string values', () => {
    beforeEach(() => {
      sut = new OptionsStrategy<string>({ options: ['a', 'b', 'c', 'd'] });
    });

    it('should validate value with success', () => {
      const payload = sut.handle('a', 'TEST', 'test');

      expect(payload.status).toBeTruthy();
    });

    it('should fail a validation and return a message', () => {
      const payload = sut.handle('abc', 'TEST', 'test');

      expect(payload.status).toBeFalsy();
      expect(payload.message).toBe(`Environment variable key TEST propertie test with value abc is not a valid option`);
    });
  });

  describe('test option using number values', () => {
    beforeEach(() => {
      sut = new OptionsStrategy<number>({ options: [1, 2, 3, 4] });
    });

    it('should validate value with success', () => {
      const payload = sut.handle(1, 'TEST', 'test');

      expect(payload.status).toBeTruthy();
    });

    it('should fail a validation and return a message', () => {
      const payload = sut.handle(5, 'TEST', 'test');

      expect(payload.status).toBeFalsy();
      expect(payload.message).toBe(`Environment variable key TEST propertie test with value 5 is not a valid option`);
    });
  });
});
