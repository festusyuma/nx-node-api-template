import { KyselyService } from '@backend-template/database';
import { Optional } from '@backend-template/helpers';
import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';

import {
  CreateAgencyData,
  CreateAgencyWithAdminData,
  UpdateAgencyData,
} from '../utils/schema/agencySchema';
import { PaginationData } from '../utils/schema/paginationSchema';
import { DB, UserStatus } from '../utils/types';

@Injectable()
export class AgencyRepo {
  constructor(private client: KyselyService<DB>) { }

  create(data: CreateAgencyData) {
    return Optional.of(
      this.client
        .insertInto('Agency')
        .values(data)
        .returningAll()
        .executeTakeFirst()
    ).elseThrow();
  }

  findAll(pagination: PaginationData) {
    const { page, size } = pagination;
    console.error(page, size);
    return Optional.of(
      this.client
        .selectFrom('Agency')
        .selectAll()
        .offset((page - 1) * size)
        .limit(size)
        .execute()
    ).elseThrow();
  }

  findById(id: string) {
    return Optional.of(
      this.client
        .selectFrom('Agency')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst()
    ).elseThrow();
  }

  updateById(id: string, data: UpdateAgencyData) {
    return Optional.of(
      this.client
        .updateTable('Agency')
        .set(data)
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst()
    ).elseThrow();
  }

  async createAgencyAndAdmin(data: CreateAgencyWithAdminData & { password: string }) {
    return this.client.transaction().execute(async (trx) => {
      const agency = await trx.insertInto('Agency').values({
        name: data.name,
      }).returning('id')
        .executeTakeFirstOrThrow()

      const hashedPassword = await bcrypt.hash(data.password, 10);
      const agencyRole = await this.client
        .selectFrom('Role')
        .select("id")
        .where('key', "=", "agency")
        .executeTakeFirstOrThrow()

      const user = await trx.insertInto('User').values({
        email: data.email,
        password: hashedPassword,
        roleId: agencyRole.id,
        username: data.username,
        status: UserStatus.ACTIVE,
      }).returning('id')
        .executeTakeFirstOrThrow()

      return trx.insertInto('AgencyAdmin').values({
        firstName: data.adminFirstName,
        lastName: data.adminLastName,
        agencyId: agency.id,
        userId: user.id,
      }).returningAll()
        .executeTakeFirst()
    });
  }
}
