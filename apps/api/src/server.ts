import { server } from '@backend-template/server';

import router from './routes';
import { getSecrets, secrets } from './secrets';
import { security } from './security';

getSecrets().then(() => {
  const port = secrets.PORT ?? 3000;

  server(router, security, secrets.BASE_ROUTE).listen(port, () => {
    console.log(`server running on: http://127.0.0.1:${port}`);
  });
});
