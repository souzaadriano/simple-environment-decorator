import { Parser } from './parser.adapter'; // Replace './parser' with the correct path to your 'Parser' class
import { TYPE_ENUM } from './type-enum';

describe('parser.adapter', () => {
  let parser: Parser;

  beforeEach(() => {
    parser = new Parser();
  });

  describe('handle', () => {
    it('should return the same string when type is TYPE_ENUM.STRING', () => {
      const input = 'hello';
      const result = parser.handle(input, TYPE_ENUM.STRING);
      expect(result).toBe(input);
    });

    it('should return the input value as a number when type is TYPE_ENUM.NUMBER', () => {
      const input = '42';
      const result = parser.handle(input, TYPE_ENUM.NUMBER);
      expect(result).toBe(42);
    });

    it('should return the input value as a boolean when type is TYPE_ENUM.BOOLEAN', () => {
      const trueInput = 'TRUE';
      const falseInput = 'false';
      const trueResult = parser.handle(trueInput, TYPE_ENUM.BOOLEAN);
      const falseResult = parser.handle(falseInput, TYPE_ENUM.BOOLEAN);
      expect(trueResult).toBe(true);
      expect(falseResult).toBe(false);
    });

    it('should return the same string when type is TYPE_ENUM.ARRAY or TYPE_ENUM.OBJECT', () => {
      const input = '{"key": "value"}';
      const arrayResult = parser.handle(input, TYPE_ENUM.ARRAY);
      const objectResult = parser.handle(input, TYPE_ENUM.OBJECT);
      expect(arrayResult).toBe(input);
      expect(objectResult).toBe(input);
    });

    it('should throw an error when an invalid type is provided', () => {
      const input = 'hello';
      const invalidType = 'INVALID' as TYPE_ENUM.STRING;
      expect(() => parser.handle(input, invalidType)).toThrow(RangeError);
    });

    it('should throw a TypeError when trying to convert an invalid string to a number', () => {
      const invalidInput = 'not a number';
      expect(() => parser.handle(invalidInput, TYPE_ENUM.NUMBER)).toThrowError(`value ${invalidInput} is not a number`);
    });
  });
});
