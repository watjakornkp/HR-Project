import { BaseSeeder } from '@adonisjs/lucid/seeders';
import User from '#models/user';
export default class extends BaseSeeder {
    async run() {
        await User.createMany([
            {
                fullName: 'HR Admin Manager',
                username: 'hr_admin',
                password: 'password123',
                department: 'Human Resource',
                role: 'HR',
            },
            {
                fullName: 'Watjakorn Glinrakon',
                username: 'khaowpod',
                password: 'password123',
                department: 'IT Support',
                role: 'STAFF',
            }
        ]);
    }
}
//# sourceMappingURL=0_user_seeder.js.map