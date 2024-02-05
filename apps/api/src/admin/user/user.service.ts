import { Injectable } from '@nestjs/common';

import { RoleRepo } from '../../repo/roleRepo';
import { UserRepo } from '../../repo/userRepo';
import { PaginationData } from '../../utils/schema/paginationSchema';
import { CreateUserData, UpdateUserData } from '../../utils/schema/userSchema';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepo, private roleRepo: RoleRepo) {}

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
    return await this.userRepo.updateById(id, data);
  }

  async findAllRoles() {
    return await this.roleRepo.findAll();
  }
}
