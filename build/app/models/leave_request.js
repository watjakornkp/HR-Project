var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { DateTime } from 'luxon';
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm';
import User from './user.js';
export default class LeaveRequest extends BaseModel {
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], LeaveRequest.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], LeaveRequest.prototype, "userId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], LeaveRequest.prototype, "leaveType", void 0);
__decorate([
    column.date(),
    __metadata("design:type", DateTime)
], LeaveRequest.prototype, "startDate", void 0);
__decorate([
    column.date(),
    __metadata("design:type", DateTime)
], LeaveRequest.prototype, "endDate", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], LeaveRequest.prototype, "reason", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], LeaveRequest.prototype, "status", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], LeaveRequest.prototype, "approvedBy", void 0);
__decorate([
    belongsTo(() => User),
    __metadata("design:type", Object)
], LeaveRequest.prototype, "user", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], LeaveRequest.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], LeaveRequest.prototype, "updatedAt", void 0);
//# sourceMappingURL=leave_request.js.map