import { EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent } from "typeorm"
import { User } from "../entities/public/User"
import * as bcrypt from "bcrypt"

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface {
    listenTo() {
        return User
    }

    async beforeInsert(event: InsertEvent<User>) {
        if (event.entity.password) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(event.entity.password, salt);
        event.entity.password = hash
        return;
        }
        const error = new Error("Password is required")
        error.name = "QueryFailed";
        throw(error)
    }

    async beforeUpdate(event: UpdateEvent<any>) {
        if (event.entity && event.entity.password) {
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(event.entity.password, salt);
            event.entity.password = hash

        }
    }
}
