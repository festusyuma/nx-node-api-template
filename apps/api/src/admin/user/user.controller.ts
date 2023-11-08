import { CustomRes, ZodValidationPipe } from '@backend-template/helpers';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import bcrypt from 'bcryptjs';

import {
  CreateUserSchema,
  paginationSchema,
  UpdateAgentSchema,
} from '../../utils/schema';
import { PaginationData } from '../../utils/schema/paginationSchema';
import { CreateUserData, UpdateUserData } from '../../utils/schema/userSchema';
import { UserService } from './user.service';

@Controller('admin/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  async create(@Body() data: CreateUserData) {
    data.password = await bcrypt.hash(data.password, 10);
    return CustomRes.success(await this.userService.create(data));
  }

  @Get()
  async findAll(
    @Query(new ZodValidationPipe(paginationSchema)) pagination: PaginationData
  ) {
    return CustomRes.success(await this.userService.findAll(pagination));
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return CustomRes.success(await this.userService.findById(id));
  }

  @Patch()
  @UsePipes(new ZodValidationPipe(UpdateAgentSchema))
  async update(@Param('id') id: string, @Body() data: UpdateUserData) {
    return CustomRes.success(await this.userService.update(id, data));
  }
}
