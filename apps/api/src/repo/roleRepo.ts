import { KyselyService } from '@backend-template/database';
import { Optional } from '@backend-template/helpers';
import { Injectable } from '@nestjs/common';

import { DB } from '../utils/types';

@Injectable()
export class RoleRepo {
  constructor(private client: KyselyService<DB>) {}

  async findAll() {
    return Optional.of(
      this.client.selectFrom('Role').selectAll().execute()
    ).elseThrow();
  }
}
