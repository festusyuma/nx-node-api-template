import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory
  .generate({
    typePaths: [join(__dirname, 'schema/schema.graphql')],
    path: 'apps/chat/src/utils/types/database.ts',
    outputAs: 'interface',
  })
  .then();
