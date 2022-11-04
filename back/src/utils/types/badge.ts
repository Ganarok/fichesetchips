import { Badge } from "../../database/entities/Badge";

export class PublicBadge {
    constructor(badge: Badge) {
        this.id = badge.id
        this.name = badge.name
        this.description = badge.description
        this.image = badge.image
        this.created_at = badge.created_at
        this.updated_at = badge.updated_at
    }
    id: string;
    name: string;
    description: string;
    image: string;
    created_at: string;
    updated_at: string;
}