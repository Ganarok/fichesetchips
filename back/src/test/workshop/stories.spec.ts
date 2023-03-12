import app from '../../server';
import { assert, expect } from 'chai';
import { agent as request } from 'supertest';
import 'mocha'

// A story is a path and a title 
describe('Stories', () => {
    it('A user should be able to retrieve his stories',
        async () => {
            // GET /stories
        }
    )
    it('A user should be able to get a story that he created',
        async () => {
            // GET /stories/story_id
            // ONLY if he created it
        }
    )
    it('A user should be able to create a story',
        async () => {
            // POST /stories
        }
    )
    it('A user should be able to delete a story',
        async () => {
            // DELETE /stories
        }
    )
    it('A user should be able to update a story',
        async () => {
            // PATCH /stories/story_id
            // Mostly the title
        }
    )
})