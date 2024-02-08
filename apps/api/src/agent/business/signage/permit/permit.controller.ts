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

import { LoggedInGuard } from '../../../../libraries/login.guard';
import {
  createSignagePermitSchema,
  updateSignagePermitSchema,
} from '../../../../utils/schema';
import {
  CreateSignagePermitData,
  UpdateSignagePermitData,
} from '../../../../utils/schema/signagePermitSchema';
import { PermitService } from './permit.service';

@Controller('agent/business')
@UsePipes(LoggedInGuard)
export class PermitController {
  constructor(private permitService: PermitService) {}

  @Post('signage/permit')
  async create(
    @Body(new ZodValidationPipe(createSignagePermitSchema))
    data: CreateSignagePermitData
  ) {
    return CustomRes.success(await this.permitService.create(data));
  }

  @Get('signage/:signage_id/permit/:id')
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('signage_id', ParseUUIDPipe) signage_id: string
  ) {
    return CustomRes.success(
      await this.permitService.findBySignageIdAndId(id, signage_id)
    );
  }

  @Put('signage/:signage_id/permit/:id')
  async updateById(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('signage_id', ParseUUIDPipe) signage_id: string,
    @Body(new ZodValidationPipe(updateSignagePermitSchema))
    data: UpdateSignagePermitData
  ) {
    return CustomRes.success(
      await this.permitService.updateSignagePermitById(id, signage_id, data)
    );
  }
}
