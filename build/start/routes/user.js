import router from "@adonisjs/core/services/router";
import UsersController from "#controllers/users_controller";
import { middleware } from "#start/kernel";
router.get('/login', [UsersController, 'showLogin'])
    .use(middleware.guest())
    .as('login');
router.get('/register', ({ view }) => view.render('pages/auth/register'))
    .use(middleware.guest())
    .as('register');
router.post('/register', [UsersController, 'register']).as('users.register');
router.post('/login', [UsersController, 'login']).as('users.login');
router.get('/logout', [UsersController, 'logout']).as('users.logout');
//# sourceMappingURL=user.js.map