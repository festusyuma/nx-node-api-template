import { CustomRes, ZodValidationPipe } from '@backend-template/helpers';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';

import { LoggedInGuard } from '../../../libraries/login.guard';
import { Pagination } from '../../../libraries/pagination.decorator';
import {
  CreateBusinessLocationSchema,
  VerifyBusinessLocationSchema,
} from '../../../utils/schema';
import {
  CreateBusinessLocationData,
  VerifyBusinessLocationData,
} from '../../../utils/schema/businessLocationSchema';
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
    @Pagination() pagination: PaginationData
  ) {
    return CustomRes.success(
      await this.businessLocationService.findBusinessLocationByBusinessId(
        id,
        pagination
      )
    );
  }

  @Get(':id/location/:location_id')
  async findByBusinessLocationById(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('location_id', ParseUUIDPipe) location_id: string
  ) {
    return CustomRes.success(
      await this.businessLocationService.findById(id, location_id)
    );
  }

  @Patch(':id/location/:location_id')
  async verifyBusinessLocation(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('location_id', ParseUUIDPipe) location_id: string,
    @Body(new ZodValidationPipe(VerifyBusinessLocationSchema))
    data: VerifyBusinessLocationData
  ) {
    return CustomRes.success(
      await this.businessLocationService.verifyBusinessLocationById(
        id,
        location_id,
        data.status
      )
    );
  }
}
