import { Env } from './Env.decorator';

describe('', () => {
  beforeAll(() => {
    process.env.NAME = 'fake_name';
    process.env.CLUSTERS = '5';
    process.env.HOST = '127.0.0.1';
    process.env.DEBUG = 'TRUE';
    process.env.LOG = 'TRUE';
  });

  it('class have all properties', () => {
    class Config {
      @Env('NAME')
      name: string;

      @Env('CLUSTERS')
      clusters: number;

      @Env('HOST')
      host: string;

      @Env('DEBUG')
      debug: boolean;

      @Env()
      log: boolean;
    }

    const sut = new Config();

    expect(sut.name).toBe('fake_name');
    expect(sut.clusters).toBe(5);
    expect(sut.host).toBe('127.0.0.1');
    expect(sut.debug).toBe(true);
    expect(sut.log).toBe(true);
  });
});
