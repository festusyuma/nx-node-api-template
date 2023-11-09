# Secrets Module

The `SecretsModule` is a crucial part of our application, providing a central and efficient way to manage and access secrets.
This module ensures that a single instance of `SecretsService` is created using the `loadSecrets` function and is made available for injection throughout the entire application.

``` typescript
loadSecrets<TS extends ZodRawShape = Record<string, ZodType>>(schema: TS, secretNames: Array<string | undefined> = [])
```
This method loads and validates secrets from both the system and AWS shared secrets into the application.
It accepts a schema for validation and an array of secret names to fetch secrets from AWS.
If any secrets fail validation, an error is thrown.

Example
```typescript
const secrets = await loadSecrets(schema, ['secretName1', 'secretName2']);
```

The heart of the `SecretsModule` lies in its provider configuration.
By using the `@Global()` decorator, we ensure that the `SecretsService` is a singleton, allowing a single instance to be shared across all modules in the application.

```typescript
@Global()
@Module({
  providers: [
    {
      provide: SecretsService,
      useFactory: async () => {
        const secrets = await loadSecrets(schema, []);
        return new SecretsService(secrets);
      },
    },
  ],
  exports: [SecretsService],
})
export class SecretsModule {}
```

### Usage
the `SecretsModule` is already available, and imported it into your libraries module, you can indeed inject the SecretsService directly into the services where it is needed. 
The provided code snippet for YourService looks great for doing just that.
```typescript
import { Injectable } from '@nestjs/common';
import { SecretsService } from '../secrets/secrets.service';

@Injectable()
export class YourService {
  constructor(private readonly secrets: SecretsService) {
    // Now you can use this.secrets to access and utilize secrets
    const dbUrl = secrets.get('DATABASE_URL')
  }
}
```
