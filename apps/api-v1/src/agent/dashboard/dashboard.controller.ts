import { Authenticated } from '@backend-template/authorizer';
import { ZodValidationPipe } from '@backend-template/helpers';
import { CreateBusinessData } from '@backend-template/types';
import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';

import { CreateBusinessSchema } from '../../utils/schema';
import { UserData } from '../../utils/schema/auth';
import { DashboardService } from './dashboard.service';

@Controller('agent/dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get()
  async findRegisteredBusinessCount(@Authenticated() user: UserData) {
    return this.dashboardService.findRegisteredBusinessCount(user.id);
  }

  @Post('business')
  @UsePipes(new ZodValidationPipe(CreateBusinessSchema))
  async createBusiness(@Body() data: CreateBusinessData) {
    return this.dashboardService.createBusiness(data);
  }
}
