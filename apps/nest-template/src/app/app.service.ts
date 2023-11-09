import { Injectable } from '@nestjs/common';

import { AppRepo } from './app.repo';

@Injectable()
export class AppService {
  constructor(private repo: AppRepo) {}
}
