import { Pagination } from '@backend-template/server';
import {
  Agent,
  CreateAgentData,
  UpdateAgentData,
} from '@backend-template/types';
import { Selectable, Updateable } from 'kysely';

export interface AgencyService {
  create(data: CreateAgentData): Promise<Selectable<Agent>>;
  findAll(pagination: Pagination): Promise<Selectable<Agent>[]>;
  findById(id: string): Promise<Selectable<Agent>>;
  update(id: string, data: UpdateAgentData): Promise<Updateable<Agent>>;
}
