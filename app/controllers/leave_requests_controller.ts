import type { HttpContext } from '@adonisjs/core/http'
import LeaveRequest from '#models/leave_request'
import { createLeaveValidator } from '#validators/leave'
import { DateTime } from 'luxon'

export default class LeaveRequestsController {

    async index({auth, view, request}: HttpContext) {
        const user = auth.getUserOrFail()
        const statusFilter = request.input('status')
        const query = LeaveRequest.query().preload('user')
        if(user.role !== 'HR'){
            query.where('userId',user.id)
        }
        if(statusFilter){
            query.where('status',statusFilter)
        }
        const requests = await query.orderBy('createdAt','desc')
        return view.render('leaves/index',{requests,userRole:user.role}) 
    } 

    async store({auth, request, response, session}: HttpContext) {
        const user = auth.getUserOrFail()
        const payload = await request.validateUsing(createLeaveValidator)
        await LeaveRequest.create({
            userId: user.id,
            leaveType: payload.leaveType,
            startDate: DateTime.fromJSDate(payload.startDate), 
            endDate: DateTime.fromJSDate(payload.endDate),
            reason: payload.reason,
            status: 0,}
        )
        session.flash('success', 'สร้างคำขอวันลาของคุณเรียบร้อยแล้ว')
        return response.redirect().toRoute('dashboard')
    }

    async show({ auth, params, response, view }: HttpContext) {
        const user = auth.getUserOrFail()
        if (user.role !== 'HR'){
            return response.unauthorized('Only HR can review requests')
        }
        const id = params.id
        const request = await LeaveRequest.query().where('id', id).preload('user').firstOrFail()
        return view.render('pages/leaves/review', { req: request })
    }

    async approve({auth, params, response, session}:HttpContext){
        const user = auth.getUserOrFail()
        if (user.role !== 'HR'){
            return response.unauthorized('Only HR can approve requests')
        }
        const id = params.id
        const request = await LeaveRequest.findOrFail(id)
        request.status = 1
        request.approvedBy = user.id
        await request.save()
        session.flash('success', 'อนุมัติคำขอลางานสำเร็จ!')
        return response.redirect().toRoute('dashboard')
    }

    async reject({ auth, params, request, response, session }: HttpContext) {
        const user = auth.getUserOrFail()
        if (user.role !== 'HR'){
            return response.unauthorized('Only HR can reject requests')
        }
        const id = params.id
        const leave = await LeaveRequest.findOrFail(id)
        leave.status = 2 
        leave.approvedBy = user.id
        leave.rejectReason = request.input('rejectReason')
        await leave.save()
        session.flash('error', 'คำขอลางานถูกปฏิเสธเรียบร้อย')
        return response.redirect().toRoute('dashboard')
    }
}