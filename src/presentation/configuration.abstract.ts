import { PropertieMetadata } from '@/core/domain/propertie-metadata.class';
import { ExcludeFunctionPropertyNames } from '@/helpers/exclude-methods.type';

export abstract class AbstractConfiguration {
  protected readonly __meta: Map<keyof ExcludeFunctionPropertyNames<this>, PropertieMetadata>;

  getKeys(): string[] {
    return Array.from(this.__meta.keys()) as string[];
  }

  getPropertieMetadata(propertieName: keyof ExcludeFunctionPropertyNames<this>): PropertieMetadata | undefined {
    return this.__meta.get(propertieName);
  }

  toObject(): ExcludeFunctionPropertyNames<this> {
    return this.getKeys().reduce((properties, key) => {
      properties[key] = (this as any)[key];
      return properties;
    }, {} as any);
  }
}
