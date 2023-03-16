import app from '../../server';
import { assert, expect } from 'chai';
import { agent as request } from 'supertest';
import 'mocha'

describe('Games', () => {
    it('A user should be able to post a player to a game',
        async () => {
            // POST players/{game_id}
            // body: { data: Player }
            // update de game
            // création d'un player
        }
    )
    it('A user should be able to delete a player from a game',
        async () => {
            // DELETE players/{ player_id }
        }
    )
})
