import router from '@adonisjs/core/services/router';
import LeaveRequestsController from '#controllers/leave_requests_controller';
import { middleware } from '#start/kernel';
router.group(() => {
    router.get('/leaves', [LeaveRequestsController, 'index']).as('leaves.index');
    router.get('/leaves/create', ({ view }) => view.render('pages/leaves/create')).as('leaves.create');
    router.post('/leaves', [LeaveRequestsController, 'store']).as('leaves.store');
    router.post('/leaves/:id/approve', [LeaveRequestsController, 'approve']).as('leaves.approve');
    router.post('/leaves/:id/reject', [LeaveRequestsController, 'reject']).as('leaves.reject');
}).use(middleware.auth());
//# sourceMappingURL=leave.js.map