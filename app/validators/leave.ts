import vine from '@vinejs/vine'

/**
 * Validator สำหรับขั้นตอนการสร้างใบลา (Requirement 1)
 */
export const createLeaveValidator = vine.compile(
  vine.object({
    leaveType: vine.enum(['Sick', 'Personal', 'Vacation']), // จำกัดประเภทการลา
    startDate: vine.date({ formats: 'YYYY-MM-DD' }),
    endDate: vine.date({ formats: 'YYYY-MM-DD' }),
    reason: vine.string().trim().minLength(10), // บังคับกรอกเหตุผลอย่างน้อย 10 ตัวอักษร
  })
)