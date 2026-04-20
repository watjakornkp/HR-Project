import vine from '@vinejs/vine';
export const createLeaveValidator = vine.compile(vine.object({
    leaveType: vine.enum(['Sick', 'Personal', 'Vacation']),
    startDate: vine.date({ formats: 'YYYY-MM-DD' }),
    endDate: vine.date({ formats: 'YYYY-MM-DD' }),
    reason: vine.string().trim().minLength(10),
}));
//# sourceMappingURL=leave.js.map