import { KyselyService } from '@backend-template/database';
import { Optional } from '@backend-template/helpers';
import { DB } from '@backend-template/types';

import { CreateAgentData, UpdateAgentData } from '../utils/schema/agentSchema';
import { PaginationData } from '../utils/schema/paginationSchema';

export class AgentRepo {
  constructor(private client: KyselyService<DB>) {}
  create(data: CreateAgentData) {
    return Optional.of(
      this.client
        .insertInto('Agent')
        .values(data)
        .returningAll()
        .executeTakeFirst()
    );
  }

  findAll(pagination: PaginationData) {
    const { page, size } = pagination;
    return Optional.of(
      this.client
        .selectFrom('Agent')
        .selectAll()
        .offset((page - 1) * size)
        .limit(size)
        .execute()
    );
  }

  findAllByAgencyId(id: string, pagination: PaginationData) {
    const { page, size } = pagination;
    return Optional.of(
      this.client
        .selectFrom('Agent')
        .where('agencyId', '=', id)
        .selectAll()
        .offset((page - 1) * size)
        .limit(size)
        .execute()
    );
  }

  findById(id: string) {
    return Optional.of(
      this.client
        .selectFrom('Agent')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst()
    );
  }

  updateById(id: string, data: UpdateAgentData) {
    return Optional.of(
      this.client
        .updateTable('Agent')
        .set(data)
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst()
    );
  }
}
