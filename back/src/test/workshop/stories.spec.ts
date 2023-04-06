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
    
    it('A user should be able to create a story',
        async () => {
            const res = await request(app)
                .post(`/stories?title=${story.title}`)
                .set({ "Authorization": `Bearer ${token}` })
                .send([42, 53, 14])
            expect(res.status).to.equal(200);
        }
    )
    it('A user should be able to retrieve his stories',
        async () => {
            const res = await request(app)
                .get('/stories')
                .set({ "Authorization": `Bearer ${token}` })
            story = res.body.data[0]
            expect(res.status).to.equal(200);
        }
    )
    it('A user should be able to get a story that he created',
        async () => {
            const res = await request(app)
                .get(`/stories/${story.id}`)
                .set({ "Authorization": `Bearer ${token}` })
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