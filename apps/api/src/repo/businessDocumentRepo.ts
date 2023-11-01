import { IOptional, Pagination } from '@backend-template/server';
import {
  BusinessDocument,
  CreateBusinessDocumentData,
} from '@backend-template/types';
import { Selectable } from 'kysely';

export interface BusinessDocumentRepo {
  create(
    data: CreateBusinessDocumentData
  ): IOptional<Selectable<BusinessDocument>>;
  findAll(pagination: Pagination): IOptional<Selectable<BusinessDocument>[]>;
  findByBusinessId(id: string): IOptional<Selectable<BusinessDocument>>;
}
