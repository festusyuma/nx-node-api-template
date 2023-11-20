import { Authenticated } from '@backend-template/authorizer';
import { CustomRes, ZodValidationPipe } from '@backend-template/helpers';
import { CreateAgentData } from '@backend-template/types';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';

import { LoggedInGuard } from '../libraries/login.guard';
import { Pagination } from '../libraries/pagination.decorator';
import { CreateAgentSchema } from '../utils/schema';
import { UserData } from '../utils/schema/auth';
import { PaginationData } from '../utils/schema/paginationSchema';
import { AgencyService } from './agency.service';

@Controller('agency')
@UseGuards(LoggedInGuard)
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
    @Pagination() pagination: PaginationData
  ) {
    return CustomRes.success(
      await this.agencyService.findAllAgent(user.id, pagination)
    );
  }
}
