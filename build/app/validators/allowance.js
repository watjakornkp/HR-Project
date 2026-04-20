import vine from '@vinejs/vine';
export const createAllowanceValidator = vine.compile(vine.object({
    title: vine.string().trim().maxLength(255),
    amount: vine.number().positive().min(1),
    expenseDate: vine.date({ formats: 'YYYY-MM-DD' }),
}));
//# sourceMappingURL=allowance.js.map