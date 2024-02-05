import { CustomRes } from '@backend-template/helpers';
import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';

import { Pagination } from '../libraries/pagination.decorator';
import { PaginationData } from '../utils/schema/paginationSchema';
import { BusinessService } from './business.service';

@Controller('/business')
export class BusinessController {
  constructor(private businessService: BusinessService) {}

  @Get(':id')
  async findBusiness(@Param('id', ParseUUIDPipe) id: string) {
    return CustomRes.success(await this.businessService.findBusiness(id));
  }

  @Get(':id/qr-code')
  async findBusinessQrCode(@Param('id', ParseUUIDPipe) id: string) {
    return CustomRes.success(await this.businessService.findBusinessQrCode(id));
  }

  @Get(':id/locations')
  async findBusinessLocation(
    @Param('id', ParseUUIDPipe) id: string,
    @Pagination() pagination: PaginationData
  ) {
    return CustomRes.success(
      await this.businessService.findBusinessLocation(id, pagination)
    );
  }

  @Get(':id/documents')
  async findBusinessDocuments(
    @Param('id', ParseUUIDPipe) id: string,
    @Pagination() pagination: PaginationData
  ) {
    return CustomRes.success(
      await this.businessService.findBusinessDocuments(id, pagination)
    );
  }
}
