import { CMap } from "../../database/entities/public/workshop/CMap"

export class GetMaps {
    constructor(map: CMap) {
        this.id = map.id
        this.title = map.title
    }
    id: string;
    title: string;
}