import router from '@adonisjs/core/services/router'


import DashboardController from '#controllers/dashboard_controller'
import { middleware } from '#start/kernel'

router.get('/dashboard', [DashboardController, 'index'])
  .use(middleware.auth())
  .as('dashboard')

router.get('/', ({ response }) => {
  // บังคับเปลี่ยนไปเปิดหน้าแดชบอร์ด
  response.redirect().toRoute('dashboard')
})

import './routes/user.js'
import './routes/leave.js'
import './routes/allowance.js'