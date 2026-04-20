import router from '@adonisjs/core/services/router'
import AllowancesController from '#controllers/allowances_controller'
import { middleware } from '#start/kernel'

router.group(() => {
  // พนักงาน: บันทึกขอเบิก (Requirement 1)
  router.get('/allowances', [AllowancesController, 'index']).as('allowances.index')
  router.get('/allowances/create', ({ view }) => view.render('pages/allowances/create')).as('allowances.create')
  router.post('/allowances', [AllowancesController, 'store']).as('allowances.store')

  // HR: อนุมัติจ่ายเบี้ยเลี้ยง (Requirement 2 & 3)
  router.get('/allowances/:id/review', [AllowancesController, 'show']).as('allowances.review')
  router.post('/allowances/:id/approve', [AllowancesController, 'approve']).as('allowances.approve')
  router.post('/allowances/:id/reject', [AllowancesController, 'reject']).as('allowances.reject')
}).use(middleware.auth())