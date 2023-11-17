import { KyselyService } from '@backend-template/database';
import { Optional } from '@backend-template/helpers';
import { Injectable } from '@nestjs/common';

import { CreateAgentData, UpdateAgentData } from '../utils/schema/agentSchema';
import { PaginationData } from '../utils/schema/paginationSchema';
import { DB } from '../utils/types';

@Injectable()
export class AgentRepo {
  constructor(private client: KyselyService<DB>) {}
  create(data: CreateAgentData) {
    return Optional.of(
      this.client
        .insertInto('Agent')
        .values(data)
        .returningAll()
        .executeTakeFirst()
    ).elseThrow();
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
    ).elseThrow();
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
    ).elseThrow();
  }

  findById(id: string) {
    return Optional.of(
      this.client
        .selectFrom('Agent')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst()
    ).elseThrow();
  }

  updateById(id: string, data: UpdateAgentData) {
    return Optional.of(
      this.client
        .updateTable('Agent')
        .set(data)
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst()
    ).elseThrow();
  }
}
