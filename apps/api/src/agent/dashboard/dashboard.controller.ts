import { Authenticated } from '@backend-template/authorizer';
import { CustomRes, ZodValidationPipe } from '@backend-template/helpers';
import { CreateBusinessData } from '@backend-template/types';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';

import { LoggedInGuard } from '../../libraries/login.guard';
import { CreateBusinessSchema, paginationSchema } from '../../utils/schema';
import { UserData } from '../../utils/schema/auth';
import { PaginationData } from '../../utils/schema/paginationSchema';
import { DashboardService } from './dashboard.service';

@Controller('agent/dashboard')
@UseGuards(LoggedInGuard)
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('registered-business-count')
  async findRegisteredBusinessCount(@Authenticated() user: UserData) {
    return CustomRes.success(
      await this.dashboardService.findRegisteredBusinessCount(user.agentId)
    );
  }

  @Get('business-todo')
  async business_todo(
    @Authenticated() user: UserData,
    @Query(new ZodValidationPipe(paginationSchema)) pagination: PaginationData
  ) {
    return CustomRes.success(
      await this.dashboardService.business_todo(user.agentId, pagination)
    );
  }

  @Post('business')
  @UsePipes(new ZodValidationPipe(CreateBusinessSchema))
  async createBusiness(@Body() data: CreateBusinessData) {
    return CustomRes.success(await this.dashboardService.createBusiness(data));
  }
}
