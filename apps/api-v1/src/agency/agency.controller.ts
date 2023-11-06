import { CustomRes, ZodValidationPipe } from '@backend-template/helpers';
import { CreateAgentData } from '@backend-template/types';
import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';

import { CreateAgentSchema } from '../utils/schema';
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
  async findAll(id: string) {
    return CustomRes.success(await this.agencyService.findAllAgent(id));
  }
}
