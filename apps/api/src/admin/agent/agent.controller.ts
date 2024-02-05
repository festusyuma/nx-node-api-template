import { CustomRes, ZodValidationPipe } from '@backend-template/helpers';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';

import { IsAdminGuard } from '../../libraries/admin.guard';
import { LoggedInGuard } from '../../libraries/login.guard';
import { Pagination } from '../../libraries/pagination.decorator';
import { CreateAgentSchema, UpdateAgentSchema } from '../../utils/schema';
import {
  CreateAgentData,
  UpdateAgentData,
} from '../../utils/schema/agentSchema';
import { PaginationData } from '../../utils/schema/paginationSchema';
import { AgentService } from './agent.service';

@Controller('admin/agent')
@UseGuards(LoggedInGuard, IsAdminGuard)
export class AgentController {
  constructor(private agentService: AgentService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateAgentSchema))
  async create(@Body() data: CreateAgentData) {
    return CustomRes.success(await this.agentService.create(data));
  }

  @Get()
  async findAll(@Pagination() pagination: PaginationData) {
    return CustomRes.success(await this.agentService.findAll(pagination));
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return CustomRes.success(await this.agentService.findById(id));
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(UpdateAgentSchema)) data: UpdateAgentData
  ) {
    return CustomRes.success(await this.agentService.update(id, data));
  }
}
