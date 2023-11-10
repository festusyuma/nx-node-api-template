import { CustomRes, ZodValidationPipe } from '@backend-template/helpers';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';

import { LoggedInGuard } from '../../../libraries/login.guard';
import {
  CreateBusinessLocationSchema,
  paginationSchema,
} from '../../../utils/schema';
import { CreateBusinessLocationData } from '../../../utils/schema/businessLocationSchema';
import { PaginationData } from '../../../utils/schema/paginationSchema';
import { BusinessLocationService } from './businessLocation.service';

@Controller('agent/business')
@UsePipes(LoggedInGuard)
export class BusinessLocationController {
  constructor(private businessLocationService: BusinessLocationService) {}

  @Post('location')
  async create(
    @Body(new ZodValidationPipe(CreateBusinessLocationSchema))
    data: CreateBusinessLocationData
  ) {
    return CustomRes.success(await this.businessLocationService.create(data));
  }

  @Get(':id/location')
  async findBusinessLocationByBusinessId(
    @Param('id', ParseUUIDPipe) id: string,
    @Query(new ZodValidationPipe(paginationSchema)) pagination: PaginationData
  ) {
    return CustomRes.success(
      await this.businessLocationService.findBusinessLocationById(
        id,
        pagination
      )
    );
  }
}
