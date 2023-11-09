# Database

The Database Library within our application serves as a centralized repository for Injectable Database Clients.
These clients are designed to seamlessly integrate with the application's library modules, allowing developers to incorporate them effortlessly and leverage their capabilities for performing various database operations.

### Extended Functionality

The extension of the Database Clients goes beyond basic database interactions. 
Specific details on the added functionality can be found in the respective documentation or comments within the codebase. 
This extension is designed to simplify common database-related tasks and enhance the overall efficiency of working with databases in our application.

By incorporating the Database Library and its Injectable Database Clients into our application's architecture, we establish a flexible and powerful foundation for handling database operations with ease and extensibility.

### Usage

To utilize the Injectable Database Clients, import the Database Service within your application's library modules. as shown below

<tabs group='database-service'>
<tab title="Kysely" group-key='kysely'>
<code-block lang='typescript'>
import { KyselyService } from '@backend-template/database'
import { Global, Module } from '@nestjs/common';
<br/>
import { SecretsModule } from '../secrets/secrets.module';
import { SecretsService } from '../secrets/secrets.service';
<br/>
@Global()
@Module({
  imports: [SecretsModule],
  providers: [
    {
      provide: KyselyService,
      inject: [SecretsService],
      useFactory: (secrets: SecretsService) => {
        return new KyselyService(secrets.get('DATABASE_URL'));
      },
    },
  ],
  exports: [KyselyService],
})
export class LibrariesModule {}
</code-block>
</tab>
<tab title="Dynamodb" group-key='dynamo'>
<code-block lang='typescript'>
import { DynamoService } from '@backend-template/database'
import { Global, Module } from '@nestjs/common';
<br/>
import { SecretsModule } from '../secrets/secrets.module';
import { SecretsService } from '../secrets/secrets.service';
<br/>
@Global()
@Module({
  imports: [SecretsModule],
  providers: [
    {
      provide: DynamoService,
      inject: [SecretsService],
      useFactory: (secrets: SecretsService) => {
        return new DynamoService(secrets.get('AWS_REGION'));
      },
    },
  ],
  exports: [DynamoService],
})
export class LibrariesModule {}
</code-block>
</tab>
</tabs>

Once the Database Module is imported, you can inject the Database Clients into your services or components, enabling seamless access to database operations.

<tabs group='database-service'>
<tab title="Kysely" group-key='kysely'>
<code-block lang='typescript'>
import { Injectable } from '@nestjs/common';
import { KyselyService } from '@backend-template/database';
<br/>
@Injectable()
export class YourLibraryService {
    constructor(private readonly client: KyselyService) {
        // Now you can perform database operations using this.client...
    }
}
</code-block>
</tab>
<tab title="Dynamodb" group-key='dynamo'>
<code-block lang='typescript'>
import { Injectable } from '@nestjs/common';
import { DynamoService } from '@backend-template/database';
<br/>
@Injectable()
export class YourLibraryService {
    constructor(private readonly client: DynamoService) {
        // Now you can perform database operations using this.client...
    }
}
</code-block>
</tab>
</tabs>

