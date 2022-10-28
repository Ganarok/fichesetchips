import defaultUsers from "../fixtures/users"

const defaultUser = defaultUsers.defaultUser
const defaultUser1 = defaultUsers.defaultUser1
const defaultUser2 = defaultUsers.defaultUser2

export default [{
    user_asked_id: defaultUser.id,
    user_answered_id: defaultUser1.id,
    accepted: true,
    nb_games: 0,
    created_at: "2022-06-24T11:29:59.619Z",
    updated_at: "2022-06-25T12:29:59.619Z"
}, {
    user_asked_id: defaultUser.id,
    user_answered_id: defaultUser2.id,
    accepted: false,
    nb_games: 0,
    created_at: "2022-06-28T11:30:59.619Z",
    updated_at: "2022-06-30T11:29:59.619Z"
}]