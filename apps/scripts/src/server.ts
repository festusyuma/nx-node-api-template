import { server } from '@backend-template/server';

import router from './routes';
import { getSecrets } from './secrets';
import { security } from './security';

getSecrets().then(() => {
  const port = process.env.PORT ?? 3000;

  server(router, security, process.env.BASE_ROUTE).listen(port, () => {
    console.log(`server running on: http://127.0.0.1:${port}`);
  });
});
