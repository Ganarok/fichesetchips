import { Reports } from "../../database/entities/Reports";

export class GetReports {
    constructor(report: Reports) {
        this.reported = report.reported
        this.by = report.by
        this.reason = report.reason
        this.created_at = report.created_at
        this.updated_at = report.updated_at
    }
    reported: string;
    by: string;
    reason: string;
    last_connection: string
    created_at: string
    updated_at: string
}

export type SendReport = {
    reason: string;
}