import { IOptional } from '@backend-template/server';
import { Agency, CreateAgencyData } from '@backend-template/types';
import { Selectable, Updateable } from 'kysely';

export interface AgencyRepo {
  create(data: CreateAgencyData): IOptional<Selectable<Agency>>;
  findAll(): IOptional<Selectable<Agency>[]>;
  findById(id: string): IOptional<Selectable<Agency>>;
  updateById(id: string, data: Agency): IOptional<Updateable<Agency>>;
}
