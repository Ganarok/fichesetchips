import app from '../../server';
import { assert, expect } from 'chai';
import { agent as request } from 'supertest';
import 'mocha'
import fs from 'fs'

describe('Stories', () => {
    const path = "./src/test/.token.txt"
    const token = fs.readFileSync(path, "utf8")
    let story = {
        "id": "",
        "title": "Story title",
        "file": [42, 53, 14]
    }
    let id = ""
    
    it('A user should be able to create a story',
        async () => {
            const res = await request(app)
                .post('/stories')
                .set({ "Authorization": `Bearer ${token}` })
                .send({
                    "title": "Story title",
                    "file": [42, 53, 14]
                })
            id = res.body.data.id
            expect(res.status).to.equal(200);
        }
    )
    it('A user should be able to retrieve his stories',
        async () => {
            const res = await request(app)
                .get('/stories')
                .set({ "Authorization": `Bearer ${token}` })
            expect(res.status).to.equal(200);
        }
    )
    it('A user should be able to get a story that he created',
        async () => {
            const res = await request(app)
                .get(`/stories/${id}`)
                .set({ "Authorization": `Bearer ${token}` })
            story = res.body.data
            expect(res.status).to.equal(200);
        }
    )
    it('A user should be able to update a story',
        async () => {
            const res = await request(app)
                .patch(`/stories/${story.id}`)
                .set({ "Authorization": `Bearer ${token}` })
                .send({
                    "title": "another story title"
                })
            expect(res.status).to.equal(200);
        }
    )
    it('A user should be able to delete a story',
        async () => {
            const res = await request(app)
                .delete(`/stories/${story.id}`)
                .set({ "Authorization": `Bearer ${token}` })
            expect(res.status).to.equal(200);
        }
    )
})