import app from '../../server';
import { assert, expect } from 'chai';
import { agent as request } from 'supertest';
import 'mocha'

describe('Games', () => {
    it('A gm should be able to begin a game',
        async () => {
            // PATCH /games/creator/{game_id}
            // body : { status: running }
        }
    )
    it('A gm should be able to close / pause a game',
        async () => {
            // PUT /games/creator/{game_id}
            // body : { status: closed, state: State }
        }
    )
})