import app from '../../server';
import { assert, expect } from 'chai';
import { agent as request } from 'supertest';
import 'mocha'

describe('Stories', () => {
    it('A user should be able to create a room + Game (as game master)',
        async () => {
            // POST /games/creator
            // body : { data: Game } 
            // POST /rooms/creator
            // body : { data: Room }
        }
    )
    it('A user should be able to update a room + Game (as game master)',
        async () => {
            // PUT /rooms/creator/{room_id}
            // body : { data: Room }
            // PUT /games/creator/{room_id}
            // body : { data: Game }
        }
    )
    it('A gm should be able to put on published one of his created rooms => only if the object game is correctly set (with story_id and map_id)',
        async () => {
            // PATCH /rooms/creator/{room_id}
            // body : { is_published: true }
        }
    )
    it('A user should be able to get all rooms that are published (public / private) OR that he is the creator and not published',
        async () => {
            // GET /rooms
            // - created by me not published
            // - created by me published
            // - not created by me public
            // - not created by me private
            // - he is in
        }
    )
    it('A user should be able to get a room',
        async () => {
            // GET /rooms/room_id
        }
    )
    it('A user should be able to enter a room that he has the password / a public room',
        async () => {
            // PATCH rooms/{room_id}
            // body : { password: string nullable }
            // POST players/{room_id}
            // body: { password: string nullable, character_id: uuid }
            // update de game
            // création d'un player
        }
    )
    it('A user should be able to enter a room that he has the password / a public room',
        async () => {
            // PATCH /rooms/{room_id}
            // body: { password: string nullable }
        }
    )
})