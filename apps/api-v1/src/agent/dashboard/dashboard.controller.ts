import { ZodValidationPipe } from '@backend-template/helpers';
import { CreateBusinessData } from '@backend-template/types';
import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';

import { CreateBusinessSchema } from '../../utils/schema';
import { DashboardService } from './dashboard.service';

@Controller('agent/dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get()
  async findRegisteredBusinessCount(id: string) {
    return this.dashboardService.findRegisteredBusinessCount(id);
  }

  @Post('business')
  @UsePipes(new ZodValidationPipe(CreateBusinessSchema))
  async createBusiness(@Body() data: CreateBusinessData) {
    return this.dashboardService.createBusiness(data);
  }
}
