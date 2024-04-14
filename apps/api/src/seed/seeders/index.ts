import AdminUserSeeder from './admin-user-seed';
import BusinessSeeders from './business';
import RolesSeeder from './roles-seeder';

const seeders: { [key: string]: { run: () => Promise<void> } } = {
  role: RolesSeeder,
  admin: AdminUserSeeder,
  business: BusinessSeeders
};

const seeder = async (seedName?: string) => {
  if (seedName) {
    const seed = seeders[seedName];
    if (!seed) return console.error('invalid seed name');

    try {
      await seed.run();
    } catch (e) {
      console.error(`Error seeding ${seedName}`);
      console.error(e);
    }
  } else {
    try {
      await RolesSeeder.run();
      await AdminUserSeeder.run();
      await BusinessSeeders.run()
    } catch (e) {
      console.error('Error seeding roles or categories');
      console.error(e);
    }
  }
};

export default seeder;
