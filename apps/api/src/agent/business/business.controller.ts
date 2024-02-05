import { CustomRes, ZodValidationPipe } from '@backend-template/helpers';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { z } from 'zod';

import { Pagination } from '../../libraries/pagination.decorator';
import { UpdateBusinessSchema } from '../../utils/schema';
import { UpdateBusinessData } from '../../utils/schema/businessSchema';
import { PaginationData } from '../../utils/schema/paginationSchema';
import { BusinessService } from './business.service';

@Controller('agent/business')
export class BusinessController {
  constructor(private businessService: BusinessService) {}

  @Get()
  async findBusiness(@Pagination() pagination: PaginationData) {
    return CustomRes.success(
      await this.businessService.findBusiness(pagination)
    );
  }

  @Get(':id')
  async findBusinessById(@Param('id', ParseUUIDPipe) id: string) {
    return CustomRes.success(await this.businessService.findBusinessById(id));
  }

  @Get(':id/qr-code-url')
  async qr_code_url(@Param('id', ParseUUIDPipe) id: string) {
    return CustomRes.success(await this.businessService.qr_code_url(id));
  }

  @Get('qr-code/:id')
  async qr_code(@Param('id', ParseUUIDPipe) id: string) {
    return CustomRes.success(await this.businessService.qr_code(id));
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

  @Post('verify')
  async verifyBusinessStatus(
    @Body(new ZodValidationPipe(z.object({ businessId: z.string().uuid() })))
    data: {
      businessId: string;
    }
  ) {
    return CustomRes.success(
      await this.businessService.verifyBusinessStatus(data.businessId)
    );
  }

  @Post('reject')
  async rejectBusinessStatus(
    @Body(
      new ZodValidationPipe(
        z.object({ businessId: z.string().uuid(), reasonRejected: z.string() })
      )
    )
    data: {
      businessId: string;
      reasonRejected: string;
    }
  ) {
    return CustomRes.success(
      await this.businessService.rejectBusinessStatus(data.businessId, data)
    );
  }
}
