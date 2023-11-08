import { KyselyService } from '@backend-template/database';
import { Optional } from '@backend-template/helpers';
import { Injectable } from '@nestjs/common';

import { CreateOtpData, UpdateOtpData } from '../utils/schema/OtpSchema';
import { DB } from '../utils/types';

@Injectable()
export class OtpRepo {
  constructor(private client: KyselyService<DB>) {}

  create(data: CreateOtpData) {
    return Optional.of(
      this.client
        .insertInto('Otp')
        .values(data)
        .returningAll()
        .executeTakeFirst()
    ).elseThrow();
  }
  findById(id: string) {
    return Optional.of(
      this.client
        .selectFrom('Otp')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst()
    ).elseThrow();
  }

  update(id: string, data: UpdateOtpData) {
    return Optional.of(
      this.client
        .updateTable('Otp')
        .set(data)
        .where('id', '=', id)
        .executeTakeFirst()
    ).elseThrow();
  }
}
