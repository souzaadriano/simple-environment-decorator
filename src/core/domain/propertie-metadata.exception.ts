export class InvalidMetadataException extends Error {
  constructor(propertie: string) {
    super(`Propertie ${propertie} have a invalid metadata`);
  }
}

export class MetadataNotFoundException extends Error {
  constructor(propertie: string) {
    super(`Metadata not found for ${propertie}`);
  }
}

export class EnvironmentVariableNotDefined extends Error {
  constructor(key: string, propertie: string) {
    super(`Environment variable ${key} not defined at propertie ${propertie}`);
  }
}
