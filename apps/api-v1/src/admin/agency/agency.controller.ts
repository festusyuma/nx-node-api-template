import { CustomRes, ZodValidationPipe } from '@backend-template/helpers';
import { CreateAgencyData } from '@backend-template/types';
import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';

import { CreateAgencySchema, UpdateAgencySchema } from '../../utils/schema';
import { UpdateAgencyData } from '../../utils/schema/agencySchema';
import { AgencyService } from './agency.service';

@Controller('admin/agency')
export class AgencyController {
  constructor(private agencyService: AgencyService) {}

  @UsePipes(new ZodValidationPipe(CreateAgencySchema))
  @Post()
  async createAgency(@Body() data: CreateAgencyData) {
    return CustomRes.success(await this.agencyService.create(data));
  }

  @Get()
  async findAll() {
    return CustomRes.success(await this.agencyService.findAll());
  }

  @UsePipes(new ZodValidationPipe(UpdateAgencySchema))
  @Patch()
  async update(@Body() data: UpdateAgencyData, @Query() id: string) {
    return CustomRes.success(await this.agencyService.update(id, data));
  }
}
