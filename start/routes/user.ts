import router from "@adonisjs/core/services/router"
import UsersController from "#controllers/users_controller"
import { middleware } from "#start/kernel"

// หน้า Login: เข้าได้เฉพาะคนที่ยังไม่ได้ Login
router.get('/login', [UsersController, 'showLogin'])
  .use(middleware.guest())
  .as('login')

// หน้า Register: (Requirement ข้อ 28)
router.get('/register', ({ view }) => view.render('pages/auth/register'))
  .use(middleware.guest())
  .as('register')

router.post('/register', [UsersController, 'register']).as('users.register')
router.post('/login', [UsersController, 'login']).as('users.login')
router.post('/logout', [UsersController, 'logout']).as('users.logout')