import { KyselyService } from '@backend-template/database';
import { Optional } from '@backend-template/helpers';
import { DB } from '@backend-template/types';

import { CreateBusinessLocationData } from '../utils/schema/businessLocationSchema';
import { PaginationData } from '../utils/schema/paginationSchema';

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

  findAll(pagination: PaginationData) {
    const { page, size } = pagination;
    return Optional.of(
      this.client
        .selectFrom('BusinessLocation')
        .selectAll()
        .offset((page - 1) * size)
        .limit(size)
        .execute()
    );
  }
  findAllByAgentId(id: string, pagination: PaginationData) {
    const { page, size } = pagination;
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
