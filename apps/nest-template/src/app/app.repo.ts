import { Injectable } from '@nestjs/common';

import { SecretsService } from '../secrets/secrets.service';

@Injectable()
export class AppRepo {
  constructor(private secrets: SecretsService) {}
}
