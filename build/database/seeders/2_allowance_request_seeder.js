import { BaseSeeder } from '@adonisjs/lucid/seeders';
import AllowanceRequest from '#models/allowance_request';
import { DateTime } from 'luxon';
export default class extends BaseSeeder {
    async run() {
        await AllowanceRequest.createMany([
            {
                userId: 2,
                title: 'เบี้ยเลี้ยงเดินทางไปพบลูกค้า (Site Visit)',
                amount: 1500.00,
                expenseDate: DateTime.now().minus({ days: 2 }),
                status: 0,
            },
            {
                userId: 2,
                title: 'ค่าที่พักสำหรับการสัมมนา IT Master Degree',
                amount: 2500.00,
                expenseDate: DateTime.now().minus({ days: 5 }),
                status: 1,
            }
        ]);
    }
}
//# sourceMappingURL=2_allowance_request_seeder.js.map