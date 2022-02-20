import 'reflect-metadata';

export class Metadata {
  private constructor(
    private readonly self: any,
    private readonly key: string,
  ) {}

  static use(self: any, key: string) {
    return new Metadata(self, key);
  }

  get type(): string {
    const data = Reflect.getMetadata('design:type', this.self, this.key);
    return data.name;
  }
}
