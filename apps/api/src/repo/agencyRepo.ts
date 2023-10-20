import { Agency } from '@backend-template/types';
import { IOptional } from '@backend-template/server';

export interface AgencyRepo {
  create(data: Agency): IOptional<Agency>;
  findAll(): IOptional<Agency[]>;
  findById(id: string): IOptional<Agency>;
  updateById(id: string, data: Agency): IOptional<Agency>;
}
