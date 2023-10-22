import { Pagination } from '@backend-template/server';
import { UserData } from '@backend-template/types';

import { DefaultRepo } from '../../repo';
import { DefaultRepoImpl } from '../../repo/impl';
import { DefaultService } from '../defaultService';

export class DefaultServiceImpl implements DefaultService {
  readonly #defaultRepo: DefaultRepo;

  constructor(defaultRepo: DefaultRepo = new DefaultRepoImpl()) {
    this.#defaultRepo = defaultRepo;
  }

  async getUser(pagination: Pagination, userData: UserData | null) {
    const user = await this.#defaultRepo
      .fetchUser('festusyuma@gmail.com')
      .unwrapOrThrow();

    console.log({ userData, pagination });

    return user;
  }
}
