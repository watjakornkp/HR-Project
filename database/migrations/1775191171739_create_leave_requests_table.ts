// database/migrations/xxxx_create_leave_requests_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'leave_requests'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('leave_type').notNullable() // ลาป่วย, ลากิจ, ลาพักร้อน
      table.date('start_date').notNullable()
      table.date('end_date').notNullable()
      table.text('reason').nullable()
      table.integer('status').defaultTo(0) // 0: Pending, 1: Approved, 2: Rejected
      table.integer('approved_by').unsigned().references('id').inTable('users').nullable()
      table.text('reject_reason').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}