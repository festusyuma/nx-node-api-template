import { Controller, Res } from '@backend-template/server';
import { CreateBusinessSchema } from '@backend-template/types';
import { Request } from 'express';

import { DashboardService } from '../../services/agent/dashboardService';
import { DashboardServiceImpl } from '../../services/impl/agent/dashboardServiceImpl';

export class DashboardController extends Controller {
  readonly #dashboardService: DashboardService;

  constructor(dashboardService: DashboardService = new DashboardServiceImpl()) {
    super();
    this.#dashboardService = dashboardService;
  }

  async createBusiness(req: Request) {
    const data = this.validate({ schema: CreateBusinessSchema }, req.body);

    const result = await this.#dashboardService.createBusiness(data);
    return Res.success(result);
  }

  async findRegisteredBusinessCount(req: Request) {
    const user = this.user(req).unwrapOrThrow();
    const result = await this.#dashboardService.findRegisteredBusinessCount(
      user
    );

    return Res.success(result);
  }
}
