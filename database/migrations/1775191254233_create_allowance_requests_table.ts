// database/migrations/xxxx_create_allowance_requests_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'allowance_requests'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('title').notNullable()
      table.decimal('amount', 12, 2).notNullable() // จำนวนเงินเบี้ยเลี้ยง
      table.date('expense_date').notNullable()
      table.integer('status').defaultTo(0)
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