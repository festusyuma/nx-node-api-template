import { KyselyService } from '@backend-template/database';
import { Optional } from '@backend-template/helpers';
import { Injectable } from '@nestjs/common';

import { assignTaskData } from "../utils/schema/taskSchema";
import { DB } from '../utils/types';

@Injectable()
export class TaskRepo {
  constructor(private client: KyselyService<DB>) { }

  createTask(data: assignTaskData & { agencyId: string }) {
    return this.client.transaction().execute(async (trx) => {
      const task = await Optional.of(
        trx
          .insertInto('Task')
          .values(data)
          .returningAll()
          .executeTakeFirst()
      ).elseThrow();
      await trx.updateTable('Business').set({ status: 'PENDING_AGENT_VERIFICATION', isAssigned: true }).execute()
      return task;
    })

  }
}
