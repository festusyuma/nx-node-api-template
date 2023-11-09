import { CustomRes } from '@backend-template/http';
import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  async getData() {
    return CustomRes.success();
  }
}
