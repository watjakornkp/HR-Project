import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        fullName: 'HR Admin Manager',
        username: 'hr_admin',
        password: 'password123', // ระบบจะ Hash ให้อัตโนมัติใน Model
        department: 'Human Resource',
        role: 'HR',
      },
      {
        fullName: 'Watjakorn Glinrakon', // ข้อมูลของคุณ
        username: 'khaowpod', // ชื่อเล่นของคุณ
        password: 'password1234',
        department: 'IT Support',
        role: 'STAFF',
      }
    ])
  }
}