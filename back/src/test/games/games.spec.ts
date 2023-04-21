import app from '../../server';
import { assert, expect } from 'chai';
import { agent as request } from 'supertest';
import defaultGames from "../../database/fixtures/games"
import defaultUsers from "../../database/fixtures/users"
import 'mocha'
import fs from 'fs'
import { Room } from '../../database/entities/public/Room';
import { User } from '../../database/entities/public/User';
import { Payload } from '../../utils/types/auth';
import * as jwt from "jsonwebtoken"
import { Player } from '../../database/entities/public/Players';
import { GameStatus } from '../../database/entities/public/Game';
import { PlayerGameView, UpdateGame } from '../../utils/types/game';
import { PublicDataSource } from '../../database/init/datasources/public-data-source';
import { Character } from '../../database/entities/public/characters/Character';

const characterIdUser1 = "982d302c-8631-47f3-9245-78772cf7383b"
const characterIdUser2 = "7098e370-41d1-471a-a592-9d1b18a6b139"

async function createMap(token: string) {
    const res = await request(app)
        .post('/maps')
        .set({ "Authorization": `Bearer ${token}` })
        .send({
            title: "Map",
            data: {},
            assets: []
        })
    return res.body.data.id
}

async function createStory(token: string) {
    const res = await request(app)
        .post(`/stories?title=Story`)
        .set({ "Authorization": `Bearer ${token}` })
        .send([42, 53, 14])
    return res.body.data
}

async function createRoom(token: string, story_id: string, map_id: string) {
    const res1 = await request(app)
        .post('/rooms')
        .set({ "Authorization": `Bearer ${token}` })
        .send({
            title: "Room",
            description: "",
            requirements: "",
            vocal_url: "",
            players_nb_max: 5,
            is_private: false,
            password: "",
            game: {
                story_id: story_id,
                universe: "cem",
                map_id: map_id
            }
        })
    const res2 = await request(app)
        .patch(`/rooms/${res1.body.data.id}`)
        .set({ "Authorization": `Bearer ${token}` })
        .send({
            is_published: true,
        })
    return res2.body.data
}

async function findRoom(token: string, room_id: string) {
    const res = await request(app)
        .get(`/rooms/${room_id}`)
        .set({ "Authorization": `Bearer ${token}` })
    return res.body.data
}

async function addPlayer(user_id: string, token: string, room_id: string, character_id: string) {
    const res = await request(app)
        .patch(`/rooms/${room_id}/join`)
        .set({ "Authorization": `Bearer ${token}` })
    const player = res.body.data.game.players.filter((player: Player) => player.user.id == user_id)
    await request(app)
        .patch(`/players/${player[0].id}`)
        .set({ "Authorization": `Bearer ${token}` })
        .send({
            character_id: character_id
        })

}

async function deleteAll(token: string, map_id: string, story_id: string) {
    const CharacterRespository = PublicDataSource.getRepository(Character)
    await CharacterRespository.save({ id: characterIdUser1, experience_points: 0, next_level_experience_points: 300, level_id: 1 }, { listeners: false })
    await CharacterRespository.save({ id: characterIdUser2, experience_points: 0, next_level_experience_points: 300, level_id: 1 }, { listeners: false })
    await request(app)
        .delete(`/maps/${map_id}`)
        .set({ "Authorization": `Bearer ${token}` })
    await request(app)
        .delete(`/stories/${story_id}`)
        .set({ "Authorization": `Bearer ${token}` })
}

// const fs = require('fs')
describe('Games', () => {
    const path = "./src/test/.token.txt"
    const token = fs.readFileSync(path, "utf8")
    let map_id: string = ""
    let story_id: string = ""
    let room: Room

    const jwtSecret = process.env.JWTSECRET || "SECRET"
    const user1 = defaultUsers.defaultUser1 as User
    const user2 = defaultUsers.defaultUser2 as User
    const user1Payload: Payload = { username: user1.username, id: user1.id, email: user1.email };
    const user2Payload: Payload = { username: user2.username, id: user2.id, email: user2.email };
    const user1Token = jwt.sign(user1Payload, jwtSecret)
    const user2Token = jwt.sign(user2Payload, jwtSecret)

    it('A gm should be able to create a room with a game, map and story inside',
        async () => {
            map_id = await createMap(token)
            story_id = await createStory(token)
            room = await createRoom(token, story_id, map_id)
            await addPlayer(user1.id, user1Token, room.id, characterIdUser1)
            await addPlayer(user2.id, user2Token, room.id, characterIdUser2)
            room = await findRoom(token, room.id)
        }
    )

    it('A gm should be able to begin a game',
        async () => {
            const res = await request(app)
                .put(`/games/${room.game.id}`)
                .set({ "Authorization": `Bearer ${token}` })
                .send({ status: "running" })
            expect(res.status).to.equal(200);
            const game = res.body.data
            assert.deepEqual(game.status, GameStatus.RUNNING)
            assert.deepEqual(game.state, {
                id: game.state.id,
                players: game.players.map((player: Player) => {
                    return {
                        id: player.id,
                        user: {
                            id: player.user.id,
                            username: player.user.username
                        },
                        character: {
                            id: player.character.id,
                            experience_points: player.character.experience_points,
                            hp: player.character.hp,
                            firstname: player.character.firstname,
                            lastname: player.character.lastname
                        }
                    }
                }),
                map: {
                    id: game.tilemap.id,
                    title: game.tilemap.title,
                    data: game.tilemap.data,
                }
            })
            room = await findRoom(token, room.id)
        }
    )
    it('A gm should be able to update the state of the game',
        async () => {
            const new_state = {
                ...room.game.state,
                map: { ...room.game.state.map, data: { height: 50 } },
                players: room.game.state.players.map(data => {
                    const player: PlayerGameView = JSON.parse(data)
                    return {
                        id: player.id,
                        user: player.user,
                        character: { ...player.character, experience_points: 50 }
                    }
                })
            }
            const res = await request(app)
                .put(`/games/${room.game.id}`)
                .set({ "Authorization": `Bearer ${token}` })
                .send({ state: new_state })
            expect(res.status).to.equal(200);
            assert.deepEqual(res.body.data.status, GameStatus.RUNNING)
            assert.deepEqual(res.body.data.state, new_state)
        }
    )
    it('A gm should be able to pause a game',
        async () => {
            const new_state = {
                ...room.game.state,
                map: { ...room.game.state.map, data: { height: 70 } },
                players: room.game.state.players.map(data => {
                    const player: PlayerGameView = JSON.parse(data)
                    return {
                        id: player.id,
                        user: player.user,
                        character: { ...player.character, experience_points: 150 }
                    }
                })
            }
            const res = await request(app)
                .put(`/games/${room.game.id}`)
                .set({ "Authorization": `Bearer ${token}` })
                .send({ status: GameStatus.PAUSED, state: new_state })
            expect(res.status).to.equal(200);
            assert.deepEqual(res.body.data.status, GameStatus.PAUSED)
            assert.deepEqual(res.body.data.state, new_state)
        }
    )
    it('A gm should be able to close a game',
        async () => {
            let i = 0
            const new_state = {
                ...room.game.state,
                map: { ...room.game.state.map, data: { height: 90 } },
                players: room.game.state.players.map(data => {
                    const player: PlayerGameView = JSON.parse(data)
                    const xp_points = 250 + i
                    i = 100
                    return {
                        id: player.id,
                        user: player.user,
                        character: { ...player.character, experience_points: xp_points }
                    }
                })
            }
            const res = await request(app)
                .put(`/games/${room.game.id}`)
                .set({ "Authorization": `Bearer ${token}` })
                .send({ status: GameStatus.CLOSED, state: new_state })
            expect(res.status).to.equal(200);
            assert.deepEqual(res.body.data.status, GameStatus.CLOSED)
            assert.deepEqual(res.body.data.state, null)
            const res1 = await request(app)
                .get(`/cem/characters/${characterIdUser1}`)
                .set({ "Authorization": `Bearer ${user1Token}` })
            expect(res1.status).to.equal(200);
            const character1 = res1.body.data
            const res2 = await request(app)
                .get(`/cem/characters/${characterIdUser2}`)
                .set({ "Authorization": `Bearer ${user2Token}` })
            expect(res2.status).to.equal(200);
            const character2 = res2.body.data


            assert.deepEqual(character1.experience_points, 250)
            assert.deepEqual(character1.next_level_experience_points, 300)
            assert.deepEqual(character1.level_id, 1)
            assert.deepEqual(character2.experience_points, 350)
            assert.deepEqual(character2.next_level_experience_points, 900)
            assert.deepEqual(character2.level_id, 2)
        }
    )
    it('A gm should be able to unpublish a room',
        async () => {
            const res = await request(app)
                .patch(`/rooms/${room.id}`)
                .set({ "Authorization": `Bearer ${token}` })
                .send({ is_published: false })
            expect(res.status).to.equal(200);
            assert.deepEqual(res.body.data.game.status, GameStatus.PLANNED)
            assert.deepEqual(res.body.data.game.state, null)
        }
    )
    it('A gm should be able to delete all room, map, story, game',
        async () => {
            await deleteAll(token, map_id, story_id)
        }
    )
})