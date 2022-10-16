import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from "typeorm"
import { User } from "../entities/User"
import * as bcrypt from "bcrypt"

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface {
    listenTo() {
        return User
    }

    async beforeInsert(event: InsertEvent<User>) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(event.entity.password, salt);
        event.entity.password = hash
    }
}
