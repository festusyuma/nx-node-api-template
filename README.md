# Introduction
Welcome to our Nest.js application, which is efficiently managed using the NX monorepo. 
Our application adheres to industry best practices and follows standards outlined in the official Nest.js and NX monorepo documentation. 
Below, you will find links to these resources for further reference and guidance.

## Application Overview
Our application leverages the power of Nest.js, a versatile framework for building scalable and maintainable server-side applications. 
Nest.js offers a robust ecosystem that simplifies the development process and helps maintain code quality.

## NX Monorepo Management
To enhance the maintainability and organization of our application, we have chosen to manage it using NX monorepo. 
NX provides powerful tools and workflows for managing large-scale, enterprise-level applications within a mono-repository. 
It enables us to structure our codebase efficiently and share code between different projects within the repository.

## Key Features
In addition to adhering to Nest.js and NX best practices, we have developed a set of helpful helper methods libraries and services to further streamline and enhance the development process. 
These resources are documented comprehensively, and you can find detailed information on how to utilize them in the sections below.

# SecretsService

The SecretsService is used for loading and validating secrets. It includes the following methods:

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

This provider ensures that a single instance of SecretsService is created using the loadSecrets function and is available for injection throughout your application.
It provides a central and efficient way to manage and access secrets within your application.

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


```typescript
CacheModule.registerAsync({
  useFactory: async (secrets: SecretsService) => {
    return {
      isGlobal: true,
      store: await redisStore({ url: secrets.get('REDIS_URL') }),
    };
  },
  inject: [SecretsService],
  isGlobal: true,
})
```

```typescript
{
  provide: CognitoService,
    useFactory: (secrets: SecretsService) => {
    return new CognitoService(secrets.get('AWS_REGION'));
  },
    inject: [SecretsService],
},
```
