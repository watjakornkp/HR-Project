import AllowanceRequest from '#models/allowance_request';
import { createAllowanceValidator } from '#validators/allowance';
import { DateTime } from 'luxon';
export default class AllowancesController {
    async index({ auth, view, request }) {
        const user = auth.getUserOrFail();
        const statusFilter = request.input('status');
        const query = AllowanceRequest.query().preload('user');
        if (user.role !== 'HR') {
            query.where('userId', user.id);
        }
        if (statusFilter !== undefined) {
            query.where('status', statusFilter);
        }
        const allowances = await query.orderBy('expenseDate', 'desc');
        return view.render('allowances/index', { allowances, userRole: user.role });
    }
    async store({ auth, request, response }) {
        const user = auth.getUserOrFail();
        const payload = await request.validateUsing(createAllowanceValidator);
        await AllowanceRequest.create({
            userId: user.id,
            title: payload.title,
            amount: payload.amount,
            expenseDate: DateTime.fromJSDate(payload.expenseDate),
            status: 0,
        });
        return response.redirect().toRoute('allowances.index');
    }
    async approve({ auth, params, response }) {
        const user = auth.getUserOrFail();
        if (user.role !== 'HR') {
            return response.unauthorized('Only HR can reject requests');
        }
        const id = params.id;
        const allowance = await AllowanceRequest.findOrFail(id);
        allowance.status = 1;
        allowance.approvedBy = user.id;
        await allowance.save();
        return response.redirect().back();
    }
    async reject({ auth, params, response }) {
        const user = auth.getUserOrFail();
        if (user.role !== 'HR') {
            return response.unauthorized('Only HR can reject requests');
        }
        const id = params.id;
        const allowance = await AllowanceRequest.findOrFail(id);
        allowance.status = 2;
        allowance.approvedBy = user.id;
        await allowance.save();
        return response.redirect().back();
    }
}
//# sourceMappingURL=allowances_controller.js.map