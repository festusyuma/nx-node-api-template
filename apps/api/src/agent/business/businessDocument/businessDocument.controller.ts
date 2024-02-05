import { CustomRes, ZodValidationPipe } from '@backend-template/helpers';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';

import { LoggedInGuard } from '../../../libraries/login.guard';
import { Pagination } from '../../../libraries/pagination.decorator';
import { CreateBusinessDocumentSchema } from '../../../utils/schema';
import { CreateBusinessDocumentData } from '../../../utils/schema/businessDocumentSchema';
import { PaginationData } from '../../../utils/schema/paginationSchema';
import { BusinessDocumentService } from './businessDocument.service';

@Controller('agent/business')
@UseGuards(LoggedInGuard)
export class BusinessDocumentController {
  constructor(private businessDocumentService: BusinessDocumentService) {}
  @Post('document')
  async create(
    @Body(new ZodValidationPipe(CreateBusinessDocumentSchema))
    data: CreateBusinessDocumentData
  ) {
    return CustomRes.success(await this.businessDocumentService.create(data));
  }

  @Get(':id/document')
  async findBusinessLocationByBusinessId(
    @Param('id', ParseUUIDPipe) id: string,
    @Pagination() pagination: PaginationData
  ) {
    return CustomRes.success(
      await this.businessDocumentService.findBusinessDocumentById(
        id,
        pagination
      )
    );
  }
}
