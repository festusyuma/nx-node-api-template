import { KyselyService } from '@backend-template/database';
import { Optional } from '@backend-template/helpers';
import { DB } from '@backend-template/types';
import { Injectable } from '@nestjs/common';

import { CreateBusinessLocationData } from '../utils/schema/businessLocationSchema';
import { PaginationData } from '../utils/schema/paginationSchema';

@Injectable()
export class BusinessLocationRepo {
  constructor(private client: KyselyService<DB>) {}

  create(data: CreateBusinessLocationData) {
    return Optional.of(
      this.client
        .insertInto('BusinessLocation')
        .values(data)
        .returningAll()
        .executeTakeFirst()
    ).elseThrow();
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
    ).elseThrow();
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
    ).elseThrow();
  }

  findAllByBusinessId(id: string, pagination: PaginationData) {
    const { page, size } = pagination;
    return Optional.of(
      this.client
        .selectFrom('BusinessLocation')
        .where('businessId', '=', id)
        .selectAll()
        .offset((page - 1) * size)
        .limit(size)
        .execute()
    ).elseThrow();
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
    ).elseThrow();
  }
}
