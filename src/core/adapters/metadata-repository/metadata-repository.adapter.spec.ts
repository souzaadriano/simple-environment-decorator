import { MetadataRepository } from './metadata-repository.adapter';
import { Fake } from './metadata-repository.mock';

describe('metadata-repository.adapter', () => {
  let sut: MetadataRepository;

  beforeAll(() => {
    sut = new MetadataRepository();
  });

  it('dpSKAOPDKASOPdkPASk', () => {
    const teste = new Fake();
    const name = sut.getType(teste, 'name');
    const num = sut.getType(teste, 'num');
    const bool = sut.getType(teste, 'bool');

    expect(name).toBe('String');
    expect(num).toBe('Number');
    expect(bool).toBe('Boolean');
  });
});
