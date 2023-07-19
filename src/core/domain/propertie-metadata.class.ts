import {
  EnvironmentVariableNotDefined,
  InvalidMetadataException,
  MetadataNotFoundException,
} from './propertie-metadata.exception';

export class PropertieMetadata {
  private _key: string;
  private _isDefault: boolean;
  private _isTransformed: boolean;
  private _isValidated: boolean;
  private _transformer: string = 'empty';
  private _validator: string[] = [];
  private _defaultValue?: any;
  private _value: any;
  readonly name: string;

  constructor(parameters: TPropertieMetadataConstructor) {
    this._key = parameters.key;
    this._defaultValue = parameters.defaultValue;
    this.name = parameters.propertie;
    this._isDefault = true;
  }

  static extract(self: any, propertie: string): PropertieMetadata {
    const metaKey = PropertieMetadata._metaPropertieKey(propertie);
    if (!self[metaKey]) throw new MetadataNotFoundException(propertie);
    if (self[metaKey] instanceof PropertieMetadata) return self[metaKey];

    throw new InvalidMetadataException(propertie);
  }

  private static _metaPropertieKey(propertie: string) {
    return `__${propertie}`;
  }

  get value() {
    return this._value ?? this._defaultValue;
  }

  get key() {
    return this._key;
  }

  get isDefault() {
    return this._isDefault;
  }

  get transformer(): TTransformed {
    return { status: this._isTransformed, name: this._transformer };
  }

  get validator(): TValidated {
    return { status: this._isValidated, validators: this._validator };
  }

  definition() {
    return { writable: true, value: this._getValue() };
  }

  addTransformer(transformerName: string) {
    this._isTransformed = true;
    this._transformer = transformerName;
  }

  addValidator(validatorName: string) {
    this._isValidated = true;
    this._validator.push(validatorName);
  }

  addValue(value: any) {
    this._value = value;
    this._isDefault = false;
  }

  private _getValue() {
    if (this._value) return this._value;
    if (this._defaultValue) return this._defaultValue;

    throw new EnvironmentVariableNotDefined(this._key, this.name);
  }
}

type TPropertieMetadataConstructor = {
  key: string;
  defaultValue?: string;
  propertie: string;
};

type TTransformed = {
  status: boolean;
  name: string;
};

type TValidated = {
  status: boolean;
  validators: string[];
};