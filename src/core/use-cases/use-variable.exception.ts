export class EnvironmentVariableNotDefined extends Error {
  constructor(key: string, propertie: string) {
    super(`Environment variable ${key} not defined at propertie ${propertie}`);
  }
}
