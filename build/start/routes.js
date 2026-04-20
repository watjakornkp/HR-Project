import router from '@adonisjs/core/services/router';
router.get('/', ({ response }) => {
    response.redirect().toRoute('leaves.index');
});
import './routes/user.js';
import './routes/leave.js';
import './routes/allowance.js';
//# sourceMappingURL=routes.js.map