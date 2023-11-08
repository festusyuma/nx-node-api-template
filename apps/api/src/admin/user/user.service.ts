import { Injectable } from '@nestjs/common';

import { UserRepo } from '../../repo/userRepo';
import { PaginationData } from '../../utils/schema/paginationSchema';
import { CreateUserData, UpdateUserData } from '../../utils/schema/userSchema';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepo) {}

  async create(data: CreateUserData) {
    return await this.userRepo.create(data);
  }

  async findAll(pagination: PaginationData) {
    return {
      result: await this.userRepo.findAll(pagination),
      pagination: pagination,
    };
  }

  async findById(id: string) {
    return await this.userRepo.findById(id);
  }
  async update(id: string, data: UpdateUserData) {
    return this.userRepo.updateById(id, data);
  }
}
