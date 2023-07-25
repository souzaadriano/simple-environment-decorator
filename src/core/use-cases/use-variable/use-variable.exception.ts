export class InvalidTypeException extends Error {
  constructor(type: string, key: string, propertie: string, avaialbleTypes: string[]) {
    super(
      `Invalid variable type ${type} for propertie ${propertie} with key ${key}, available types ${avaialbleTypes}`,
    );
  }
}
