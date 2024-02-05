import { KyselyService } from '@backend-template/database';
import { Optional } from '@backend-template/helpers';
import { Injectable } from '@nestjs/common';

import { CreateBusinessLocationData } from '../utils/schema/businessLocationSchema';
import { PaginationData } from '../utils/schema/paginationSchema';
import { BusinessLocationStatus, BusinessStatus, DB } from '../utils/types';

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
        .leftJoin('Business', 'Business.id', 'BusinessLocation.businessId')
        .selectAll()
        .offset((page - 1) * size)
        .limit(size)
        .execute()
    ).elseThrow();
  }

  findById(id: string, locationId: string) {
    return Optional.of(
      this.client
        .selectFrom('BusinessLocation')
        .leftJoin('Business', 'Business.id', 'BusinessLocation.businessId')
        .where('Business.id', '=', id)
        .where('BusinessLocation.id', '=', locationId)
        .selectAll()
        .executeTakeFirst()
    ).elseThrow();
  }

  findAllByAgentId(id: string, pagination: PaginationData) {
    const { page, size } = pagination;
    return Optional.of(
      this.client
        .selectFrom('BusinessLocation')
        .leftJoin('Business', 'Business.id', 'BusinessLocation.businessId')
        .where('agentId', '=', id)
        .select([
          'BusinessLocation.id',
          'Business.name',
          'BusinessLocation.status',
          'Business.additionalData',
          'BusinessLocation.streetAddress',
          'BusinessLocation.created_at',
          'BusinessLocation.updated_at',
        ])
        .offset((page - 1) * size)
        .limit(size)
        .execute()
    ).elseThrow();
  }

  findAllUnVerifiedByAgentId(id: string, pagination: PaginationData) {
    const { page, size } = pagination;
    return Optional.of(
      this.client
        .selectFrom('BusinessLocation')
        .leftJoin('Business', 'Business.id', 'BusinessLocation.businessId')
        .where('agentId', '=', id)
        .where('Business.status', 'not in', [BusinessStatus.REJECTED])
        .where('BusinessLocation.status', 'in', [
          BusinessLocationStatus.PENDING,
          BusinessLocationStatus.UNVERIFIED,
        ])
        .select([
          'BusinessLocation.id',
          'Business.id as business_id',
          'Business.name',
          'BusinessLocation.status',
          'BusinessLocation.streetAddress',
          'BusinessLocation.created_at',
          'BusinessLocation.updated_at',
        ])
        .offset((page - 1) * size)
        .limit(size)
        .orderBy('BusinessLocation.created_at desc')
        .execute()
    ).elseThrow();
  }

  findAllByBusinessId(id: string, pagination: PaginationData) {
    const { page, size } = pagination;
    return Optional.of(
      this.client
        .selectFrom('BusinessLocation')
        .leftJoin('Business', 'Business.id', 'BusinessLocation.businessId')
        .where('businessId', '=', id)
        .select([
          'BusinessLocation.id',
          'Business.name',
          'BusinessLocation.status',
          'BusinessLocation.streetAddress',
          'BusinessLocation.created_at',
          'BusinessLocation.updated_at',
        ])
        .offset((page - 1) * size)
        .limit(size)
        .orderBy('BusinessLocation.created_at desc')
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

  updateStatusById(
    id: string,
    location_id: string,
    status: 'UNVERIFIED' | 'PENDING' | 'VERIFIED'
  ) {
    return Optional.of(
      this.client
        .updateTable('BusinessLocation')
        .set({ status: status })
        .where('businessId', '=', id)
        .where('id', '=', location_id)
        .returningAll()
        .executeTakeFirst()
    ).elseThrow();
  }
}
