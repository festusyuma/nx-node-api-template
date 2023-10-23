import { getKyselyClient } from '@backend-template/database';

const data = [
  {
    name: 'Agency',
    key: 'agency',
  },
  {
    name: 'Agent',
    key: 'agent',
  },
  {
    name: 'Admin',
    key: 'admin',
  },
];

const RolesSeeder = {
  run: async () => {
    await getKyselyClient()
      .transaction()
      .execute(async () => {
        data.map(({ name, key }) =>
          getKyselyClient()
            .insertInto('Role')
            .values({
              name: name,
              key: key,
            })
            .execute()
        );
      });
  },
};

export default RolesSeeder;
