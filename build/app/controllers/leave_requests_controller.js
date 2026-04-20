import LeaveRequest from '#models/leave_request';
import { createLeaveValidator } from '#validators/leave';
import { DateTime } from 'luxon';
export default class LeaveRequestsController {
    async index({ auth, view, request }) {
        const user = auth.getUserOrFail();
        const statusFilter = request.input('status');
        const query = LeaveRequest.query().preload('user');
        if (user.role !== 'HR') {
            query.where('userId', user.id);
        }
        if (statusFilter) {
            query.where('status', statusFilter);
        }
        const requests = await query.orderBy('createdAt', 'desc');
        return view.render('leaves/index', { requests, userRole: user.role });
    }
    async store({ auth, request, response }) {
        const user = auth.getUserOrFail();
        const payload = await request.validateUsing(createLeaveValidator);
        await LeaveRequest.create({
            userId: user.id,
            leaveType: payload.leaveType,
            startDate: DateTime.fromJSDate(payload.startDate),
            endDate: DateTime.fromJSDate(payload.endDate),
            reason: payload.reason,
            status: 0,
        });
        return response.redirect().toRoute('leaves.index');
    }
    async approve({ auth, params, response }) {
        const user = auth.getUserOrFail();
        if (user.role !== 'HR') {
            return response.unauthorized('Only HR can approve requests');
        }
        const id = params.id;
        const request = await LeaveRequest.findOrFail(id);
        request.status = 1;
        request.approvedBy = user.id;
        await request.save();
        return response.redirect().back();
    }
    async reject({ auth, params, response }) {
        const user = auth.getUserOrFail();
        if (user.role !== 'HR') {
            return response.unauthorized('Only HR can reject requests');
        }
        const id = params.id;
        const leave = await LeaveRequest.findOrFail(id);
        leave.status = 2;
        leave.approvedBy = user.id;
        await leave.save();
        return response.redirect().back();
    }
}
//# sourceMappingURL=leave_requests_controller.js.map