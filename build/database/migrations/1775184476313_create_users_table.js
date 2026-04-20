import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'users';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary();
            table.string('full_name').nullable();
            table.string('username').notNullable().unique();
            table.string('password').notNullable();
            table.string('department').notNullable();
            table.enum('role', ['STAFF', 'HR']).defaultTo('STAFF');
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1775184476313_create_users_table.js.map