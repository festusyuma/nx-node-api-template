import { CustomRes, ZodValidationPipe } from '@backend-template/helpers';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
} from '@nestjs/common';

import { paginationSchema, UpdateBusinessSchema } from '../../utils/schema';
import { UpdateBusinessData } from '../../utils/schema/businessSchema';
import { PaginationData } from '../../utils/schema/paginationSchema';
import { BusinessService } from './business.service';

@Controller('agent/business')
export class BusinessController {
  constructor(private businessService: BusinessService) {}

  @Get()
  async findBusiness(
    @Query(new ZodValidationPipe(paginationSchema)) pagination: PaginationData
  ) {
    return CustomRes.success(
      await this.businessService.findBusiness(pagination)
    );
  }

  @Get(':id')
  async findBusinessById(@Param('id', ParseUUIDPipe) id: string) {
    return CustomRes.success(await this.businessService.findBusinessById(id));
  }

  @Patch(':id')
  async updateBusiness(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(UpdateBusinessSchema))
    data: UpdateBusinessData
  ) {
    return CustomRes.success(
      await this.businessService.updateBusinessById(id, data)
    );
  }
}
