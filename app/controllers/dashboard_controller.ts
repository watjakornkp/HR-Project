import type { HttpContext } from '@adonisjs/core/http'
import LeaveRequest from '#models/leave_request'
import AllowanceRequest from '#models/allowance_request'

export default class DashboardController {
  async index({ auth, view }: HttpContext) {
    const user = auth.getUserOrFail()

    // 1. ดึงข้อมูลสถิติต่างๆ (เช่นเฉพาะของคนที่ล็อกอิน หรือทั้งหมดถ้า HR)
    let pendingLeavesCount = 0
    let pendingAllowancesCount = 0
    let leavesQuery = LeaveRequest.query().preload('user')
    let allowancesQuery = AllowanceRequest.query().preload('user')

    if (user.role !== 'HR') {
      // ถ้าไม่ใช่ HR เอาเฉพาะสถิติและรายการของตัวเอง
      const leavesC = await LeaveRequest.query().where('userId', user.id).where('status', 0).count('* as total')
      pendingLeavesCount = leavesC[0].$extras.total

      const allowC = await AllowanceRequest.query().where('userId', user.id).where('status', 0).count('* as total')
      pendingAllowancesCount = allowC[0].$extras.total

      leavesQuery.where('userId', user.id)
      allowancesQuery.where('userId', user.id)
    } else {
      // ถ้าเป็น HR ให้ดึงตัวเลขภาพรวมทั้งบริษัท
      const leavesC = await LeaveRequest.query().where('status', 0).count('* as total')
      pendingLeavesCount = leavesC[0].$extras.total

      const allowC = await AllowanceRequest.query().where('status', 0).count('* as total')
      pendingAllowancesCount = allowC[0].$extras.total
    }

    // 2. ดึง 5 สิ่งล่าสุด
    const recentLeaves = await leavesQuery.orderBy('createdAt', 'desc').limit(5)
    const recentAllowances = await allowancesQuery.orderBy('createdAt', 'desc').limit(5)

    return view.render('pages/dashboard', {
       pendingLeavesCount,
       pendingAllowancesCount,
       recentLeaves,
       recentAllowances,
       userRole: user.role
    })
  }
}
