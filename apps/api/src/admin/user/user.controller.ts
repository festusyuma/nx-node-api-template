import { CustomRes, ZodValidationPipe } from '@backend-template/helpers';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import bcrypt from 'bcryptjs';

import { IsAdminGuard } from '../../libraries/admin.guard';
import { LoggedInGuard } from '../../libraries/login.guard';
import { CreateUserSchema, paginationSchema } from '../../utils/schema';
import { PaginationData } from '../../utils/schema/paginationSchema';
import {
  CreateUserData,
  UpdateUserData,
  UpdateUserSchema,
} from '../../utils/schema/userSchema';
import { UserService } from './user.service';

@Controller('admin/user')
@UseGuards(LoggedInGuard, IsAdminGuard)
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

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateUserSchema)) data: UpdateUserData
  ) {
    return CustomRes.success(await this.userService.update(id, data));
  }
}
