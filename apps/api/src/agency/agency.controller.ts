import { Authenticated } from '@backend-template/authorizer';
import { CustomRes, ZodValidationPipe } from '@backend-template/helpers';
import { CreateAgentData } from '@backend-template/types';
import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';

import { CreateAgentSchema, paginationSchema } from '../utils/schema';
import { UserData } from '../utils/schema/auth';
import { PaginationData } from '../utils/schema/paginationSchema';
import { AgencyService } from './agency.service';

@Controller('agency')
export class AgencyController {
  constructor(private agencyService: AgencyService) {}

  @Post('agent')
  @UsePipes(new ZodValidationPipe(CreateAgentSchema))
  async createAgent(@Body() data: CreateAgentData) {
    return CustomRes.success(await this.agencyService.createAgent(data));
  }

  @Get('agent')
  async findAll(
    @Authenticated() user: UserData,
    @Query(new ZodValidationPipe(paginationSchema)) pagination: PaginationData
  ) {
    return CustomRes.success(
      await this.agencyService.findAllAgent(user.id, pagination)
    );
  }
}
