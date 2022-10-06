import User from "../database/models/users";

export async function createUser() {
    return await User.findOne()
}
