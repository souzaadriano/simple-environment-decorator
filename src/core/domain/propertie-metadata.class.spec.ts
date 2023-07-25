import { PropertieMetadata } from './propertie-metadata.class';
import {
  EnvironmentVariableNotDefined,
  InvalidMetadataException,
  MetadataNotFoundException,
} from './propertie-metadata.exception';

describe('propertie-metadata.class', () => {
  let sut: PropertieMetadata;
  beforeEach(() => {
    sut = new PropertieMetadata({ key: 'TEST', propertie: 'test' });
  });

  describe('check static methods', () => {
    it('should set metadata to a object without meta', () => {
      const target: any = {};
      PropertieMetadata.set({ target, metadata: sut });

      expect(target.__meta).toBeInstanceOf(Map);
      expect(target.__meta.get('test')).toBeInstanceOf(PropertieMetadata);
    });

    it('should append metadata to a object with meta', () => {
      const target: any = {};
      PropertieMetadata.set({ target, metadata: sut });
      let otherMetadta = new PropertieMetadata({ key: 'TEST2', propertie: 'test2' });
      PropertieMetadata.set({ target, metadata: otherMetadta });

      expect(target.__meta.size).toBe(2);
      expect(target.__meta).toBeInstanceOf(Map);
      expect(target.__meta.get('test2')).toBeInstanceOf(PropertieMetadata);
    });

    it('should be return a sut metadata from target', () => {
      const target: any = {};
      PropertieMetadata.set({ target, metadata: sut });

      const metadata = PropertieMetadata.get(target, 'test');
      expect(metadata).toBeInstanceOf(PropertieMetadata);
      expect(metadata).toBe(sut);
    });

    it('should throw an MetadataNotFoundException because metadata is not added yet', () => {
      const target: any = {};

      expect(() => PropertieMetadata.get(target, 'test')).toThrow(MetadataNotFoundException);
    });

    it('should throw an InvalidMetadataException because metadata is not added yet', () => {
      const target: any = {};
      PropertieMetadata.set({ target, metadata: sut });

      expect(() => PropertieMetadata.get(target, 'test2')).toThrow(InvalidMetadataException);
    });
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(sut.key).toBe('TEST');
  });

  it('should return a last value', () => {
    sut.addValue('abc');
    const definition = sut.definition();

    expect(definition.value).toBe('abc');
    expect(definition.writable).toBeTruthy();
    expect(sut.isDefault).toBeFalsy();
    expect(sut.value).toBe('abc');
  });

  it('should return a default value', () => {
    const sut = new PropertieMetadata({ key: 'TEST', propertie: 'test', defaultValue: 'xpto' });
    const definition = sut.definition();
    expect(sut.value).toBe('xpto');
    expect(definition.value).toBe('xpto');
    expect(definition.writable).toBeTruthy();
    expect(sut.isDefault).toBeTruthy();
    expect(sut.transformer.name).toBe('empty');
    expect(sut.transformer.status).toBeFalsy();
  });

  it('should throw an EnvironmentVariableNotDefined error', () => {
    expect(sut.value).toBe(undefined);
    expect(() => sut.definition()).toThrow(EnvironmentVariableNotDefined);
  });

  it('should be value is transformed', () => {
    sut.addValue('abc');

    expect(sut.value).toBe('abc');

    sut.addTransformer('EXAMPLE');
    sut.addValue(['abc']);

    expect(sut.value).toEqual(['abc']);
    expect(sut.transformer.name).toBe('EXAMPLE');
    expect(sut.transformer.status).toBeTruthy();
  });

  it('should be value is validated', () => {
    sut.addValue('abc');

    expect(sut.value).toBe('abc');

    sut.addValidator('EXAMPLE');

    expect(sut.validator.validators).toEqual(['EXAMPLE']);
    expect(sut.validator.status).toBeTruthy();
  });
});
