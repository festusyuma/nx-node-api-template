import { Pagination } from '@backend-template/server';
import { Agent, CreateAgentData } from '@backend-template/types';
import { Selectable, Updateable } from 'kysely';

export interface AgentService {
  findAll(pagination: Pagination): Promise<Selectable<Agent>[]>;
  findById(id: string): Promise<Selectable<Agent>>;
  create(data: CreateAgentData): Promise<Selectable<Agent>>;
  update(id: string, data: Agent): Promise<Updateable<Agent>>;
}
