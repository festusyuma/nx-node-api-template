import { CustomRes, ZodValidationPipe } from '@backend-template/helpers';
import { CreateAgencyData } from '@backend-template/types';
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
import { CreateAgencySchema, UpdateAgencySchema } from '../../utils/schema';
import { UpdateAgencyData } from '../../utils/schema/agencySchema';
import { PaginationData } from '../../utils/schema/paginationSchema';
import { AgencyService } from './agency.service';

@Controller('admin/agency')
@UseGuards(LoggedInGuard, IsAdminGuard)
export class AgencyController {
  constructor(private agencyService: AgencyService) {}

  @UsePipes(new ZodValidationPipe(CreateAgencySchema))
  @Post()
  async createAgency(@Body() data: CreateAgencyData) {
    return CustomRes.success(await this.agencyService.create(data));
  }

  @Get()
  async findAll(@Pagination() pagination: PaginationData) {
    return CustomRes.success(await this.agencyService.findAll(pagination));
  }

  @Patch(':id')
  async update(
    @Body(new ZodValidationPipe(UpdateAgencySchema)) data: UpdateAgencyData,
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return CustomRes.success(await this.agencyService.update(id, data));
  }
}
