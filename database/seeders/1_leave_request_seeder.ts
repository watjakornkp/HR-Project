import { BaseSeeder } from '@adonisjs/lucid/seeders'
import LeaveRequest from '#models/leave_request'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    await LeaveRequest.create({
      userId: 2, 
      leaveType: 'Sick',
      startDate: DateTime.now(), 
      endDate: DateTime.now().plus({ days: 1 }),
      reason: 'มีอาการติดเชื้อที่หู (Ear Infection)',
      status: 0, 
    })
  }
}