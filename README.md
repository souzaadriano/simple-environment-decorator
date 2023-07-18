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

```typescript
// src/app.config.ts
import { Environment, Singleton } from 'environment-variables-decorator';

// Caso voce queira instanciar em diferentes lugares, pode utilizar o decorator de singleton para criar uma instancia unica.

// @Singleton
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

```typescript
// src/app.config.ts
import { Environment, factory } from 'environment-variables-decorator';

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

```typescript
// src/app.config.ts
import { Environment, factory } from 'environment-variables-decorator';

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
