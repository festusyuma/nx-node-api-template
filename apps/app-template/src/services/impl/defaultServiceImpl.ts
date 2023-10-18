import { DefaultRepo } from '../../repo';
import { DefaultRepoImpl } from '../../repo/impl';
import { DefaultService } from '../defaultService';

export class DefaultServiceImpl implements DefaultService {
  readonly #defaultRepo: DefaultRepo;

  constructor(defaultRepo: DefaultRepo = new DefaultRepoImpl()) {
    this.#defaultRepo = defaultRepo;
  }

  async getUser() {
    const user = await this.#defaultRepo
      .fetchUser('festusyuma@gmail.com')
      .unwrapOrThrow();

    console.log('user :: ', user);

    return user;
  }
}
