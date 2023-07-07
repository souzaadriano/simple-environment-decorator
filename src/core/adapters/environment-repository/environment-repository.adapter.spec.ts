import { EnvironmentRepository } from './environment-repository.adapter';

describe('environment-repository.adapter', () => {
  let sut: EnvironmentRepository;

  beforeAll(() => {
    process.env = {
      NAME: 'teste',
      NUM: '1',
      BOOL: 'TRUE',
    };
    sut = new EnvironmentRepository();
  });
  it('should return environment variables', () => {
    const NAME = sut.get('NAME');
    const NUM = sut.get('NUM');
    const BOOL = sut.get('BOOL');

    expect(NAME).toBe('teste');
    expect(NUM).toBe('1');
    expect(BOOL).toBe('TRUE');
  });
});
