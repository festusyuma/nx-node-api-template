import {
  Agent,
  CreateAgentData,
  CreateUserData,
  User,
} from '@backend-template/types';
import { Selectable, Updateable } from 'kysely';

export interface AgentService {
  findAll(): Promise<Selectable<Agent>[]>;
  findById(id: string): Promise<Selectable<Agent>>;
  create(data: CreateAgentData): Promise<Selectable<Agent>>;
  createAgentUser(data: CreateUserData): Promise<Selectable<User>>;
  update(id: string, data: Agent): Promise<Updateable<Agent>>;
}
