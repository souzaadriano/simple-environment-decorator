# Simple-Environment-Decorator

## Description

This library aims to facilitate the use of environment variables by automatically loading them and providing tools for reading, transforming, and validating them through decorators for your configuration class.

- Decorator to read environment variables `@Environment`
- Decorator to transform built-in environment variables
  - Transforms variables into string arrays `@ToStringArray`
  - Transforms variables into number arrays `@ToNumberArray`
  - Factory for creating custom transformation decorators using the `ITransformStrategy<T>` interface
- Decorators to validate built-in environment variables
  - Validation using options `@Option`
  - Factory for creating custom validation decorators using the `IValidateStrategy` interface

## How to Use

`.env` file example

```config
APP_PORT=7000
APP_NAME=EXAMPLE
SHOW_LOGS=TRUE
RETRY_TIMEOUTS_IN_MS=3000,2000,1000
NODE_ENV=local
REPORT_APIS=http://report.com;http://report2.com;http://report3.com
```

Voce pode criar um arquivo unico com todas as suas variveis, ou pode separar em varios arquivos de confirações especificos.

## @Environment

Definition `@Environment(VariableName: string, DefaultValue: string)`

```typescript
// src/app.config.ts
import { Environment } from 'environment-variables-decorator';

// Caso voce queira instanciar em diferentes lugares, pode utilizar o decorator de singleton para criar uma instancia unica.

// @Singleton can be imported from 'environment-variables-decorator';
class AppConfig {
  @Environment('APP_NAME')
  name: string;

  @Environment('APP_PORT', 7000)
  port: number;

  @Environment('SHOW_LOGS', false)
  showLogs: boolean;
}
```

```typescript
// src/app.server.ts
import { AppConfig } from './app.config';

const config = new AppConfig();

const server = new Server({
  port: config.port,
  name: config.name,
  log: config.showLogs,
});
```

## Transform

```typescript
// src/app.config.ts
import { Environment, ToStringArray, ToNumberArray } from 'environment-variables-decorator';

// Caso voce queira instanciar em diferentes lugares, pode utilizar o decorator de singleton para criar uma instancia unica.

// @Singleton
class AppConfig {
  @ToNumberArray({ splitBy: ',' })
  @Environment('RETRY_TIMEOUTS_IN_MS')
  retryTimeouts: number;

  @ToStringArray({ splitBy: ';' })
  @Environment('REPORT_APIS', 7000)
  reportApis: string;
}
```

### Custom transformers

You can implement your own transformers using the `ITransformStrategy` interface and use `factory.transform` to create a custom decorator.

`src/custom-transformer.strategy.ts`

```typescript
import { ITransformStrategy } from 'environment-variables-decorator';

export class CustomTransformer implements ITransformStrategy<string, string> {
  constructor(private readonly _config: TCustomTransformerConfig) {}

  handle(value: string): string {
    const { encodeType } = this._config;
    return Buffer.from(value).toString(encodeType);
  }
}

type TCustomTransformerConfig = {
  encodeType: 'hex' | 'base64';
};
```

`src/custom-transformer.decorator.ts`

```typescript
import { factory } from 'environment-variables-decorator';
import { CustomTransformer } from './custom-transform.strategy';

export const CustomTransfomerDecorator = factory.transform(CustomTransformer);
```

## Validator

```typescript
// src/app.config.ts
import { Environment, Option } from 'environment-variables-decorator';

// Caso voce queira instanciar em diferentes lugares, pode utilizar o decorator de singleton para criar uma instancia unica.

// @Singleton
class ValueConfig {
  @Option({ options: ['integer', 'decimal', 'float'] })
  @Environment('VALUE_TYPE', 'integer')
  valueType: string;

  @CustomValidatorDecorator({})
  @Environment('NODE_ENV', 'local')
  nodeEnv: string;
}
```

### Custom Validator

You can implement your own validator using the `IValidateStrategy` interface and use `factory.validate` to create a custom decorator.

`src/custom-validator.strategy.ts`

```typescript
import { IValidateStrategy, TValidatePayload } from 'environment-variables-decorator';

export class CustomValidator implements IValidateStrategy<string> {
  private _nodeEnv = new Set(['local', 'development', 'production']);

  constructor(config: TCustomValidatorConfig) {
    if (config.customOption) config.customOption.forEach((option) => this._nodeEnv.add(option));
  }

  handle(value: string, key: string, propertie: string): TValidatePayload {
    const status = this._nodeEnv.has(value);
    if (status) return { message: 'success', status: true };

    return {
      message: `Invalid ${key} must be 'local', 'development', 'production' and getted ${value} on propertie ${propertie}`,
      status: false,
    };
  }
}

export type TCustomValidatorConfig = {
  customOption?: string[];
};
```

`src/custom-transformer.decorator.ts`

```typescript
import { factory } from 'environment-variables-decorator';
import { CustomValidator } from './custom-validator.strategy';

export const CustomValidatorDecorator = factory.validate(CustomValidator);
```
