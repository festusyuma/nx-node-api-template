import { Authenticated } from '@backend-template/authorizer';
import { CustomRes, ZodValidationPipe } from '@backend-template/helpers';
import { CreateAgentData } from '@backend-template/types';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { z } from 'zod';

import { LoggedInGuard } from '../libraries/login.guard';
import { Pagination } from '../libraries/pagination.decorator';
import {assignTaskSchema, CreateAgentSchema, createPaymentTypeSchema} from '../utils/schema';
import { UserData } from '../utils/schema/auth';
import { PaginationData } from '../utils/schema/paginationSchema';
import { CreatePaymentTypeData } from '../utils/schema/paymentTypeSchema';
import { assignTaskData } from "../utils/schema/taskSchema";
import { AgencyService } from './agency.service';

@Controller('agency')
@UseGuards(LoggedInGuard)
export class AgencyController {
  constructor(private agencyService: AgencyService) { }

  @Post('agent')
  @UsePipes(new ZodValidationPipe(CreateAgentSchema))
  async createAgent(@Body() data: CreateAgentData) {
    return CustomRes.success(await this.agencyService.createAgent(data));
  }

  @Get('agent')
  async findAll(
    @Authenticated() user: UserData,
    @Pagination() pagination: PaginationData
  ) {
    return CustomRes.success(
      await this.agencyService.findAllAgent(user.id, pagination)
    );
  }

  @Post('payment-type')
  async createPaymentType(
    @Body(new ZodValidationPipe(createPaymentTypeSchema))
    data: CreatePaymentTypeData
  ) {
    return CustomRes.success(await this.agencyService.createPaymentType(data));
  }

  @Get('payment-type/:id')
  async paymentType(
    @Param('id', ParseUUIDPipe) id: string,
    @Pagination() pagination: PaginationData
  ) {
    return CustomRes.success(
      await this.agencyService.paymentType(id, pagination)
    );
  }


  @Get('business-pending-approval')
  async fetchBusinessesPendingApproval(
    @Pagination() pagination: PaginationData,
    @Authenticated() user: UserData,

  ) {
    return CustomRes.success(
      await this.agencyService.businessPendingApproval(user.agencyId, pagination)
    );
  }


  @Post('approve-business')
  async approveAgencyBusiness(
    @Param('id', ParseUUIDPipe) id: string,
    @Authenticated() user: UserData,

  ) {
    return CustomRes.success(
      await this.agencyService.approveBusiness(id, user.agencyId,)
    );
  }


  @Post('reject-business')
  async rejectBusinessStatus(
    @Authenticated() user: UserData,
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
      await this.agencyService.rejectBusinessStatus({ agencyId: user.agencyId, businessId: data.businessId, data })
    );
  }

  @Post('assign-task')
  async assignTask(
    @Authenticated() user: UserData,
    @Body(new ZodValidationPipe(assignTaskSchema)) assignTaskPayload: assignTaskData) {
    const task = await this.agencyService.assignTaskToAgent({
      assignTaskPayload,
      agencyId: user.agencyId
    });
    return CustomRes.created(task)
  }
}
