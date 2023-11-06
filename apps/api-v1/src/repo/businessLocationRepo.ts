import { KyselyService } from '@backend-template/database';
import { Optional } from '@backend-template/helpers';
import { DB, UserData } from '@backend-template/types';

import { CreateBusinessLocationData } from '../utils/schema/businessLocationSchema';

export class BusinessLocationRepo {
  constructor(private client: KyselyService<DB>) {}

  create(data: CreateBusinessLocationData) {
    return Optional.of(
      this.client
        .insertInto('BusinessLocation')
        .values(data)
        .returningAll()
        .executeTakeFirst()
    );
  }

  findAll() {
    const { page, size } = { page: 1, size: 10 };
    return Optional.of(
      this.client
        .selectFrom('BusinessLocation')
        .selectAll()
        .offset((page - 1) * size)
        .limit(size)
        .execute()
    );
  }
  findAllByAgentId(id: string) {
    const { page, size } = { page: 1, size: 10 };
    return Optional.of(
      this.client
        .selectFrom('BusinessLocation')
        .where('agentId', '=', id)
        .selectAll()
        .offset((page - 1) * size)
        .limit(size)
        .execute()
    );
  }

  findAgentRegisteredBusinessCount(id: string) {
    return Optional.of(
      this.client
        .selectFrom('BusinessLocation')
        .where('agentId', '=', id)
        .select((eb) =>
          eb.fn.countAll<number>().as('AgentRegisteredBusinessCount')
        )
        .executeTakeFirst()
    );
  }
}
