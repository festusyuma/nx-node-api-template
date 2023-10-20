import { Pagination } from '@backend-template/server';
import { Agency } from '@backend-template/types';

export interface AgencyService {
  findAll(pagination: Pagination): Promise<Agency[]>;
  findById(id: string): Promise<Agency>;
  create(data: Agency): Promise<Agency>;
  update(id: string, data: Agency): Promise<Agency>;
}
