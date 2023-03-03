import { PublicDataSource } from "../../database/init/datasources/public-data-source";
import { Payload } from "../../utils/types/auth";
import * as jwt from "jsonwebtoken"
import { Story } from "../../database/entities/public/workshop/Story";
import { User } from "../../database/entities/public/User";

const StoryRepository = PublicDataSource.getRepository(Story)
const UserRepository = PublicDataSource.getRepository(User)

export async function create(username: string, body: object) {
    const user = await UserRepository.findOneByOrFail({ username: username })
    const story = await StoryRepository.save({ user_id: user.id, ...body })
    return story
}

export async function find(username: string) {
    const user = await UserRepository.findOneByOrFail({ username: username })
    const stories = await StoryRepository.findBy({ user_id: user.id })
    return stories
}

export async function findOne(username: string, story_id: string) {
    const user = await UserRepository.findOneByOrFail({ username: username })
    const story = await StoryRepository.findOneByOrFail({ user_id: user.id, id: story_id })
    return story
}

export async function update(username: string, body: object, story_id: string) {
    if (Object.keys(body).every(elem => ["title", "path"].includes(elem)) == false) {
        throw new Error("Unexpected parameters")
    }
    const user = await UserRepository.findOneByOrFail({ username: username })
    const story = await StoryRepository.findOneByOrFail({ user_id: user.id, id: story_id })
    await StoryRepository.save({ id: story.id, ...body })
    const new_story = await StoryRepository.findOneByOrFail({ user_id: user.id, id: story_id })
    return new_story
}

export async function destroy(username: string, story_id: string) {
    const user = await UserRepository.findOneByOrFail({ username: username })
    const story = await StoryRepository.findOneByOrFail({ user_id: user.id, id: story_id })
    await StoryRepository.remove(story)
    return story
}


