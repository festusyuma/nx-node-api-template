import {
  Business,
  CreateBusinessData,
  UserData,
} from '@backend-template/types';
import { Selectable } from 'kysely';

export interface DashboardService {
  findRegisteredBusinessCount(user: UserData): Promise<object>;
  createBusiness(data: CreateBusinessData): Promise<Selectable<Business>>;
}
