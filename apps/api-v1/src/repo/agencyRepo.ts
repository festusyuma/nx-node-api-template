import { KyselyService } from '@backend-template/database';
import { Optional } from '@backend-template/helpers';
import { DB } from '@backend-template/types';
import { Injectable } from '@nestjs/common';

import {
  CreateAgencyData,
  UpdateAgencyData,
} from '../utils/schema/agencySchema';
import { PaginationData } from '../utils/schema/paginationSchema';

@Injectable()
export class AgencyRepo {
  constructor(private client: KyselyService<DB>) {}

  create(data: CreateAgencyData) {
    return Optional.of(
      this.client
        .insertInto('Agency')
        .values(data)
        .returningAll()
        .executeTakeFirst()
    );
  }

  findAll(pagination: PaginationData) {
    const { page, size } = pagination;
    return Optional.of(
      this.client
        .selectFrom('Agency')
        .selectAll()
        .offset((page - 1) * size)
        .limit(size)
        .execute()
    );
  }

  findById(id: string) {
    return Optional.of(
      this.client
        .selectFrom('Agency')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst()
    );
  }

  updateById(id: string, data: UpdateAgencyData) {
    return Optional.of(
      this.client
        .updateTable('Agency')
        .set(data)
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst()
    );
  }
}
