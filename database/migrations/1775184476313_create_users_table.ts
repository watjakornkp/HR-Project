// database/migrations/xxxx_create_users_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('full_name').nullable()
      table.string('username').notNullable().unique()
      table.string('password').notNullable()
      table.string('department').notNullable() // สำหรับรายงานแยกแผนก [Requirement 3]
      table.enum('role', ['STAFF', 'HR']).defaultTo('STAFF') // สำหรับการแบ่งสิทธิ์ [Requirement 24]
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}