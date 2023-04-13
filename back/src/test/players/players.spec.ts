import app from '../../server';
import { assert, expect } from 'chai';
import { agent as request } from 'supertest';
import 'mocha'

describe('Games', () => {
    it('A user should be able to set his character for a game',
        async () => {
            // POST players/{game_id}
            // body: { character_id : uuid }
            // création d'un player

            // PATCH players/{player_id}
            // body: { character_id : uuid }
            // update d'un player
        }
    )
})
