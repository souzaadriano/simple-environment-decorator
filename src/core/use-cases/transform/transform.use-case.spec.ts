import { Mock } from '@/helpers/mock/mock.factory';
import { TransformUseCase } from './transform.use-case';
import { ITransformStrategy } from './strategies';

const strategyMockImplementation = (value: string) => {
  return value.split(',');
};
const TransformStrategyMock = Mock.factory<ITransformStrategy>();
describe('transform.use-case', () => {
  let sut: TransformUseCase;
  let strategyMock: ITransformStrategy;

  beforeAll(() => {
    sut = new TransformUseCase({});
    strategyMock = TransformStrategyMock.get();
  });

  it('should transform variable into string array', () => {
    TransformStrategyMock.override('handle').implement(strategyMockImplementation);
    const result = sut.handle({ value: 'a,b,c,d', strategy: strategyMock });

    expect(result.value).toEqual(['a', 'b', 'c', 'd']);
    expect(result.value).toHaveLength(4);
  });

  it('should throw an error', () => {
    TransformStrategyMock.override('handle').throw(Error, 'test');
    expect(() => sut.handle({ value: 'a,b,c,d', strategy: strategyMock })).toThrow(Error);
  });
});
