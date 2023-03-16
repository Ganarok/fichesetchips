import app from '../../server';
import { assert, expect } from 'chai';
import { agent as request } from 'supertest';
import 'mocha'

describe('Games', () => {
    it('A user should be able to update a game (as game master)',
        async () => {
            // PUT /games/{game_id}
            // body : { data: Game }
        }
    )
})