import { CustomRes, ZodValidationPipe } from '@backend-template/helpers';
import { CreateAgentData, UpdateAgentData } from '@backend-template/types';
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

import {
  CreateAgentSchema,
  paginationSchema,
  UpdateAgentSchema,
} from '../../utils/schema';
import { PaginationData } from '../../utils/schema/paginationSchema';
import { AgentService } from './agent.service';

@Controller('admin/agent')
export class AgentController {
  constructor(private agentService: AgentService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateAgentSchema))
  async create(@Body() data: CreateAgentData) {
    return CustomRes.success(await this.agentService.create(data));
  }

  @Get()
  @UsePipes(new ZodValidationPipe(paginationSchema))
  async findAll(@Query() pagination: PaginationData) {
    return CustomRes.success(await this.agentService.findAll(pagination));
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return CustomRes.success(await this.agentService.findById(id));
  }

  @Patch()
  @UsePipes(new ZodValidationPipe(UpdateAgentSchema))
  async update(@Param('id') id: string, @Body() data: UpdateAgentData) {
    return CustomRes.success(await this.agentService.update(id, data));
  }
}
