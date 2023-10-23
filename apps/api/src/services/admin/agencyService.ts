import { Pagination } from '@backend-template/server';
import { Agency, CreateAgencyData } from '@backend-template/types';
import { Selectable, Updateable } from 'kysely';

export interface AgencyService {
  findAll(pagination: Pagination): Promise<Selectable<Agency>[]>;
  findById(id: string): Promise<Selectable<Agency>>;
  create(data: CreateAgencyData): Promise<Selectable<Agency>>;
  update(id: string, data: Agency): Promise<Updateable<Agency>>;
}
