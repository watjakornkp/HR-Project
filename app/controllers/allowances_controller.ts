import type { HttpContext } from '@adonisjs/core/http'
import AllowanceRequest from '#models/allowance_request'
import { createAllowanceValidator } from '#validators/allowance'
import { DateTime } from 'luxon'

export default class AllowancesController {
    async index({ auth, view, request }: HttpContext) {
        const user = auth.getUserOrFail()
        const statusFilter = request.input('status')
        const query = AllowanceRequest.query().preload('user')
        if (user.role !== 'HR') {
            query.where('userId', user.id)
        }
        if (statusFilter !== undefined) {
            query.where('status', statusFilter)
        }
        const allowances = await query.orderBy('expenseDate', 'desc')
        return view.render('allowances/index', { allowances, userRole: user.role })
    }

    async store({ auth, request, response, session }: HttpContext) {
        const user = auth.getUserOrFail()
        const payload = await request.validateUsing(createAllowanceValidator)
        await AllowanceRequest.create({
            userId: user.id,
            title: payload.title,
            amount: payload.amount,
            expenseDate: DateTime.fromJSDate(payload.expenseDate),
            status: 0,
        })
        session.flash('success', 'บันทึกคำขอเบิกเบี้ยเลี้ยงเรียบร้อยแล้ว')
        return response.redirect().toRoute('dashboard')
    }

    async show({ auth, params, response, view, session }: HttpContext) {
        const user = auth.getUserOrFail()
        if (user.role !== 'HR') {
            session.flash('error', 'Only HR can review requests')
            return response.redirect().back()
        }
        const id = params.id
        const allowance = await AllowanceRequest.query().where('id', id).preload('user').firstOrFail()
        return view.render('pages/allowances/review', { req: allowance })
    }

    async approve({ auth, params, response, session }: HttpContext) {
        const user = auth.getUserOrFail()
        if (user.role !== 'HR') {
            session.flash('error', 'Only HR can approve requests')
            return response.redirect().back()
        }
        const id = params.id
        const allowance = await AllowanceRequest.findOrFail(id)
        allowance.status = 1
        allowance.approvedBy = user.id
        await allowance.save()
        session.flash('success', 'อนุมัติจ่ายข้อเบิกเบี้ยเลี้ยงสำเร็จ!')
        return response.redirect().toRoute('dashboard')
    }

    async reject({ auth, params, request, response, session }: HttpContext) {
        const user = auth.getUserOrFail()
        if (user.role !== 'HR') {
            session.flash('error', 'Only HR can reject requests')
            return response.redirect().back()
        }
        const id = params.id
        const allowance = await AllowanceRequest.findOrFail(id)
        allowance.status = 2
        allowance.approvedBy = user.id
        allowance.rejectReason = request.input('rejectReason')
        await allowance.save()
        session.flash('error', 'คำขอเบิกเบี้ยเลี้ยงถูกปฏิเสธเรียบร้อย')
        return response.redirect().toRoute('dashboard')
    }
}
