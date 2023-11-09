import { httpBootstrap } from '@backend-template/server';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';

httpBootstrap(AppModule, 'auth').then((res) => {
  const port = process.env.PORT ?? 3000;

  res
    .listen(port)
    .then(() =>
      Logger.log(`🚀 Application is running on: http://localhost:${port}/auth`)
    );
});
