import { IOptional, Pagination } from '@backend-template/server';
import { Business, CreateBusinessData } from '@backend-template/types';
import { Selectable } from 'kysely';

export interface BusinessRepo {
  create(data: CreateBusinessData): IOptional<Selectable<Business>>;
  findAll(pagination: Pagination): IOptional<Selectable<Business>[]>;
}
