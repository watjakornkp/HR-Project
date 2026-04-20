import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {

    async showLogin({ view }: HttpContext) {
        return view.render('pages/login')
    }

    async login({ auth, request, response, session }: HttpContext) {
        const { username, password } = request.only(['username', 'password'])

        try {

            const user = await User.verifyCredentials(username, password)
            await auth.use('web').login(user)
            session.flash('success', `ยินดีต้อนรับคุณ ${user.fullName}`)
            return response.redirect().toRoute('leaves.index')
        }   catch (error) {

        session.flash('error', 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง')
        return response.redirect().back()
        }
    }

    async logout({ auth, response, session }: HttpContext) {
        await auth.use('web').logout()
        session.flash('success', 'ออกจากระบบเรียบร้อยแล้ว')
        return response.redirect().toRoute('login')
    }

    async register({ request, response, session }: HttpContext) {
        const data = request.only(['username', 'password', 'fullName', 'department', 'role'])
        await User.create({
        username: data.username,
        password: data.password,
        fullName: data.fullName,
        department: data.department,
        role: data.role || 'STAFF', 
        })
        session.flash('success', 'ลงทะเบียนพนักงานใหม่สำเร็จ')
        return response.redirect().toRoute('login')
    }
}