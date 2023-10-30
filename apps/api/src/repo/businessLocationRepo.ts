import { IOptional, Pagination } from '@backend-template/server';
import {
  BusinessLocation,
  CreateBusinessLocationData,
  UserData,
} from '@backend-template/types';
import { Selectable } from 'kysely';

export interface BusinessLocationRepo {
  create(
    data: CreateBusinessLocationData
  ): IOptional<Selectable<BusinessLocation>>;
  findAll(pagination: Pagination): IOptional<Selectable<BusinessLocation>[]>;
  findAgentRegisteredBusinessCount(
    user: UserData
  ): IOptional<Selectable<object>>;
}
