import { CustomRes, ZodValidationPipe } from '@backend-template/helpers';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';

import { LoggedInGuard } from '../../../libraries/login.guard';
import { Pagination } from '../../../libraries/pagination.decorator';
import {
  createSignageSchema,
  updateSignageSchema,
} from '../../../utils/schema';
import { PaginationData } from '../../../utils/schema/paginationSchema';
import {
  CreateSignageData,
  UpdateSignageData,
} from '../../../utils/schema/signageSchema';
import { SignageService } from './signage.service';

@Controller('agent/business')
@UsePipes(LoggedInGuard)
export class SignageController {
  constructor(private signageService: SignageService) {}

  @Post('signage')
  async create(
    @Body(new ZodValidationPipe(createSignageSchema)) data: CreateSignageData
  ) {
    return CustomRes.success(await this.signageService.create(data));
  }

  @Get(':id/signage')
  async findByBusinessId(
    @Param('id', ParseUUIDPipe) id: string,
    @Pagination() pagination: PaginationData
  ) {
    return CustomRes.success(
      await this.signageService.findByBusinessId(id, pagination)
    );
  }

  @Get(':business_id/signage/:id')
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('business_id', ParseUUIDPipe) business_id: string
  ) {
    return CustomRes.success(
      await this.signageService.findByBusinessSignage(id, business_id)
    );
  }

  @Put(':business_id/signage/:id')
  async updateById(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('business_id', ParseUUIDPipe) business_id: string,
    @Body(new ZodValidationPipe(updateSignageSchema)) data: UpdateSignageData
  ) {
    return CustomRes.success(
      await this.signageService.updateById(id, business_id, data)
    );
  }
}
