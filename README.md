# Simple-Environment-Decorator

Example

```typescript
import { Env } from 'environment-variables-decorator';

class Config {
  /*
    env file example
    APP_PORT=8001
    NAME=application_name
  */

  @Env('APP_PORT')
  port: number;

  @Env() // is equal a @Env('NAME')
  name: string;
}

console.log('config', new Config());
/* output
config {
    port: 8001
    name: 'application_name'
}
*/
```
