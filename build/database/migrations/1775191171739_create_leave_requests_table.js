import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'leave_requests';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
            table.string('leave_type').notNullable();
            table.date('start_date').notNullable();
            table.date('end_date').notNullable();
            table.text('reason').nullable();
            table.integer('status').defaultTo(0);
            table.integer('approved_by').unsigned().references('id').inTable('users').nullable();
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1775191171739_create_leave_requests_table.js.map