import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { join } from 'path';

import { ChannelModule } from './channel/channel.module';
import { ChannelMemberModule } from './channel-member/channel-member.module';
import { LibrariesModule } from './libraries/libraries.module';
import { MessageModule } from './message/message.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      typePaths: [join(__dirname, 'schema/schema.graphql')],
      path: 'chat/graphql',
      graphiql: true,
    }),
    ChannelModule,
    LibrariesModule,
    ChannelMemberModule,
    ProfileModule,
    MessageModule,
  ],
  providers: [],
})
export class AppModule {}
