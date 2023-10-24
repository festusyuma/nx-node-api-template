import { IOptional } from '@backend-template/server';
import {
  Agent,
  CreateAgentData,
  UpdateAgentData,
} from '@backend-template/types';
import { Selectable, Updateable } from 'kysely';

export interface AgentRepo {
  create(data: CreateAgentData): IOptional<Selectable<Agent>>;
  findAll(): IOptional<Selectable<Agent>[]>;
  findById(id: string): IOptional<Selectable<Agent>>;
  updateById(id: string, data: UpdateAgentData): IOptional<Updateable<Agent>>;
}
