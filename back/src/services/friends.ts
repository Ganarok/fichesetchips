import { PublicDataSource } from "../database/init/datasources/public-data-source";
import { Friend } from "../database/entities/public/Friend"
import { User } from "../database/entities/public/User"

const FriendRepository = PublicDataSource.getRepository(Friend)
const UserRepository = PublicDataSource.getRepository(User)

export async function findMyFriends(username: string) {
    const user = await UserRepository.findOneByOrFail({ username: username })
    const friends = await FriendRepository.find({
        where: [{ user_answered_id: user.id, accepted: true }, { user_asked_id: user.id, accepted: true }],
        order: { created_at: "DESC" },
        relations: {
            user_asked: true,
            user_answered: true
        },
        select: {
            user_answered: {
                username: true,
                last_connection: true,
                avatar: true
            },
            user_asked: {
                username: true,
                last_connection: true,
                avatar: true
            }
        }
    })
    const friends_pending_approval = await FriendRepository.find({
        where: { user_answered_id: user.id, accepted: false },
        order: { created_at: "DESC" },
        relations: {
            user_asked: true,
            user_answered: true
        },
        select: {
            user_answered: {
                username: true,
                last_connection: true,
                avatar: true
            },
            user_asked: {
                username: true,
                last_connection: true,
                avatar: true
            }
        }
    })
    const friends_pending_request = await FriendRepository.find({
        where: { user_asked_id: user.id, accepted: false },
        order: { created_at: "DESC" },
        relations: {
            user_asked: true,
            user_answered: true
        },
        select: {
            user_answered: {
                username: true,
                last_connection: true,
                avatar: true
            },
            user_asked: {
                username: true,
                last_connection: true,
                avatar: true
            }
        }
    })
    return { friends: friends, pending_approval: friends_pending_approval, pending_request: friends_pending_request }
}

export async function findFriendsFromAUser(username: string) {
    const user = await UserRepository.findOneByOrFail({ username: username })
    const friends = await FriendRepository.find({
        where: [{ user_answered_id: user.id, accepted: true }, { user_asked_id: user.id, accepted: true }],
        order: { created_at: "DESC" },
        relations: {
            user_asked: true,
            user_answered: true
        },
        select: {
            user_answered: {
                username: true,
                last_connection: true,
                avatar: true
            },
            user_asked: {
                username: true,
                last_connection: true,
                avatar: true
            }
        }
    })
    return { friends: friends }
}
export async function findPendingRequestedFriendsFromAUser(id: string) {
    const friends = await FriendRepository.find({
        where: { user_asked_id: id, accepted: false },
        order: { created_at: "DESC" },
        relations: {
            user_asked: true,
            user_answered: true
        },
        select: {
            user_answered: {
                username: true,
                last_connection: true,
                avatar: true
            },
            user_asked: {
                username: true,
                last_connection: true,
                avatar: true
            }
        }
    })
    return { friends: friends }
}
export async function findPendingapprovalFriendsFromAUser(id: string) {
    const friends = await FriendRepository.find({
        where: { user_answered_id: id, accepted: false },
        order: { created_at: "DESC" },
        relations: {
            user_asked: true,
            user_answered: true
        },
        select: {
            user_answered: {
                username: true,
                last_connection: true,
                avatar: true
            },
            user_asked: {
                username: true,
                last_connection: true,
                avatar: true
            }
        }
    })
    return { friends: friends }
}


export async function askAFriend(user_id: string, username: string) {
    const user_to_ask = await UserRepository.findOneByOrFail({ username: username })
    const friends = await findMyFriends(username)
    friends.friends.map(accepted_friend => {
        if (Object.values(accepted_friend).includes(user_id)) {
            const error = new Error("This user is already a friend")
            error.name = "QueryFailed";
            throw (error)
        }
    })
    friends.pending_approval.map(pending_friend => {
        if (Object.values(pending_friend).includes(user_id)) {
            const error = new Error("THis user has already asked you as a friend")
            error.name = "QueryFailed";
            throw (error)
        }
    })
    friends.pending_request.map(pending_friend => {
        if (Object.values(pending_friend).includes(user_id)) {
            const error = new Error("This user is waiting for your approval")
            error.name = "QueryFailed";
            throw (error)
        }
    })
    await FriendRepository.save({
        user_asked_id: user_id,
        user_answered_id: user_to_ask.id
    })
    return await findMyFriends(username)
}

export async function updateFriend(id: string, username: string, hasAccept: boolean) {
    const user_who_answer = await UserRepository.findOneByOrFail({ id: id })
    const user_who_asked = await UserRepository.findOneByOrFail({ username: username })
    const friendShip = await FriendRepository.findOneByOrFail({ user_answered_id: id, accepted: false, user_asked_id: user_who_asked.id })
    friendShip.accepted = hasAccept
    await FriendRepository.save(friendShip)
    return await findMyFriends(user_who_answer.username)
}

export async function deleteFriend(id: string, username: string) {
    const user_who_wants_to = await UserRepository.findOneByOrFail({ id: id })
    const user_friend = await UserRepository.findOneByOrFail({ username: username })
    const friends = await FriendRepository.find({ where: [{ user_answered_id: user_friend.id, user_asked_id: user_who_wants_to.id }, { user_answered_id: user_who_wants_to.id, user_asked_id: user_friend.id }] })
    if (friends.length == 0) {
        const e = new Error("Friendship doesn't exist")
        e.name = "NotFound"
        throw e
    } else {
        await FriendRepository.remove(friends)
        return await findMyFriends(user_who_wants_to.username)
    }
}
