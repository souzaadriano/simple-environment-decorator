import { EnvironmentRepositoryMock } from '@/core/adapters/environment-repository/environment-repository.mock';
import { MetadataRepositoryMock } from '@/core/adapters/metadata-repository/metadata-repository.mock';
import { Parser } from '@/core/adapters/parser/parser.adapter';
import { InvalidTypeException } from './use-variable.exception';
import { UseVariableUseCase } from './use-variable.use-case';

describe('use-variable.use-case', () => {
  let sut: UseVariableUseCase;
  const environmentRepository = EnvironmentRepositoryMock.get();
  const metadataRepository = MetadataRepositoryMock.get();
  const parser = new Parser();

  beforeAll(() => {
    sut = new UseVariableUseCase({
      environmentRepository,
      metadataRepository,
      parser,
    });
  });

  it('shoud return variable parsed to string', () => {
    const self = {};
    MetadataRepositoryMock.override('getType').return('String');
    EnvironmentRepositoryMock.override('get').return('TESTE');

    const payload = sut.handle({ key: 'NAME', self, propertie: '' });

    expect(payload.value).toBe('TESTE');
    expect(metadataRepository.getType).toBeCalledTimes(1);
    expect(environmentRepository.get).toBeCalledTimes(1);
  });

  it('shoud return variable parsed to string using default value', () => {
    const self = {};
    MetadataRepositoryMock.override('getType').return('String');
    EnvironmentRepositoryMock.override('get').return(undefined);

    const payload = sut.handle({ key: 'NAME', self, propertie: '', defaultValue: 'TESTE' });

    expect(payload.value).toBe('TESTE');
    expect(metadataRepository.getType).toBeCalledTimes(0);
    expect(environmentRepository.get).toBeCalledTimes(1);
  });

  it('shoud return variable parsed to number', () => {
    const self = {};
    MetadataRepositoryMock.override('getType').return('Number');
    EnvironmentRepositoryMock.override('get').return('1');

    const payload = sut.handle({ key: '', self, propertie: '' });

    expect(payload.value).toBe(1);
    expect(metadataRepository.getType).toBeCalledTimes(1);
    expect(environmentRepository.get).toBeCalledTimes(1);
  });

  it('shoud return variable parsed to boolean', () => {
    const self = {};
    MetadataRepositoryMock.override('getType').return('Boolean');
    EnvironmentRepositoryMock.override('get').return('TRUE');

    const payload = sut.handle({ key: '', self, propertie: '' });

    expect(payload.value).toBe(true);
    expect(metadataRepository.getType).toBeCalledTimes(1);
    expect(environmentRepository.get).toBeCalledTimes(1);
  });

  it('should throw an InvalidTypeException because is a invalid type', () => {
    const self = {};
    MetadataRepositoryMock.override('getType').return('Null');
    EnvironmentRepositoryMock.override('get').return('TRUE');

    expect(() => sut.handle({ key: '', self, propertie: '' })).toThrow(InvalidTypeException);
  });
});
