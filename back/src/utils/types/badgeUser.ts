import { BadgeUser } from "../../database/entities/BadgeUser";

export class PublicBadgeUser {
    constructor(badgeUser: BadgeUser) {
        this.id = badgeUser.id
        this.user_id = badgeUser.user_id
        this.badge_id = badgeUser.badge_id
        this.percentage_completion = badgeUser.percentage_completion
        this.created_at = badgeUser.created_at
        this.updated_at = badgeUser.updated_at
    }
    id: string;
    user_id: string;
    badge_id: string;
    percentage_completion: number;
    created_at: string;
    updated_at: string;
}