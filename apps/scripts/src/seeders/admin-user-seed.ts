import { getKyselyClient } from '@backend-template/database';
import bcrypt from 'bcryptjs';

const email = process.env.DEFAULT_ADMIN_USER || 'admin@admin.com';

const AdminUserSeeder = {
  run: async () => {
    await getKyselyClient()
      .insertInto('User')
      .values({
        id: '8a93a86b-6f2b-4b17-b6d6-bdc5ca041a02',
        username: 'ADMIN',
        roleId: '559f6c03-ff5a-4fcb-bbca-cf6e7e562dcd',
        email: email,
        password: bcrypt.hashSync('admin@password'),
      })
      .execute();
  },
};

export default AdminUserSeeder;
