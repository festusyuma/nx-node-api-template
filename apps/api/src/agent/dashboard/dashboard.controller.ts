import { Authenticated } from '@backend-template/authorizer';
import { CustomRes, ZodValidationPipe } from '@backend-template/helpers';
import { CreateBusinessData } from '@backend-template/types';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';

import { LoggedInGuard } from '../../libraries/login.guard';
import { CreateBusinessSchema } from '../../utils/schema';
import { UserData } from '../../utils/schema/auth';
import { DashboardService } from './dashboard.service';

@Controller('agent/dashboard')
@UseGuards(LoggedInGuard)
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('registered-business-count')
  async findRegisteredBusinessCount(@Authenticated() user: UserData) {
    return CustomRes.success(
      await this.dashboardService.findRegisteredBusinessCount(user.id)
    );
  }

  @Post('business')
  @UsePipes(new ZodValidationPipe(CreateBusinessSchema))
  async createBusiness(@Body() data: CreateBusinessData) {
    return CustomRes.success(await this.dashboardService.createBusiness(data));
  }
}
