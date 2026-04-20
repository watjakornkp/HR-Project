import router from '@adonisjs/core/services/router'
import LeaveRequestsController from '#controllers/leave_requests_controller'
import { middleware } from '#start/kernel'

router.group(() => {
  // พนักงาน: ดูประวัติและขอลา (Requirement 1)
  router.get('/leaves', [LeaveRequestsController, 'index']).as('leaves.index')
  router.get('/leaves/create', ({ view }) => view.render('pages/leaves/create')).as('leaves.create')
  router.post('/leaves', [LeaveRequestsController, 'store']).as('leaves.store')

  // HR: อนุมัติ/ปฏิเสธ (Requirement 2)
  router.get('/leaves/:id/review', [LeaveRequestsController, 'show']).as('leaves.review')
  router.post('/leaves/:id/approve', [LeaveRequestsController, 'approve']).as('leaves.approve')
  router.post('/leaves/:id/reject', [LeaveRequestsController, 'reject']).as('leaves.reject')
  
  // รายงาน: (Requirement 3) สามารถดึงผ่าน index โดยใส่ query string ?status=1
}).use(middleware.auth())