import { getKyselyClient } from '@backend-template/database';

const data = [
  {
    id: '559f6c03-ff5a-4fcb-bbca-cf6e7e562dcd',
    name: 'Admin',
    key: 'admin',
  },
  {
    id: 'ad0499c5-e718-47e4-9b95-c656aa771d74',
    name: 'Agency',
    key: 'agency',
  },
  {
    id: '6e4c307c-8b6f-497a-a6b0-7773b5908fac',
    name: 'Agent',
    key: 'agent',
  },
];

const RolesSeeder = {
  run: async () => {
    await getKyselyClient()
      .transaction()
      .execute(async () => {
        data.map(({ name, key, id }) =>
          getKyselyClient()
            .insertInto('Role')
            .values({
              id: id,
              name: name,
              key: key,
            })
            .onConflict((oc) => oc.column('id').doNothing())
            .execute()
        );
      });
  },
};

export default RolesSeeder;
