import app from '../../server';
import { assert, expect } from 'chai';
import { agent as request } from 'supertest';
import 'mocha'
import fs from 'fs'

// const fs = require('fs')
describe('Maps', () => {
    const path = "./src/test/.token.txt"
    const token = fs.readFileSync(path, "utf8")
    let cmap = {
        id: "",
        title: "Map title",
        data: {},
        assets: [{
            name: 'sol',
            image: Buffer.from([
                137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13,
                73, 72, 68, 82, 0, 0, 1, 9, 0, 0, 0, 199,
                8, 6, 0, 0, 0, 10, 253, 166, 20, 0, 0, 0,
                1, 115, 82, 71, 66, 0, 174, 206, 28, 233, 0, 0,
                0, 6, 98, 75, 71, 68, 0, 255, 0, 255, 0, 255,
                160, 189, 167, 147, 0, 0, 0, 9, 112, 72, 89, 115,
                0, 0, 11, 19, 0, 0, 11, 19, 1, 0, 154, 156,
                24, 0, 0, 0, 7, 116, 73, 77, 69, 7, 216, 8,
                30, 21, 56, 13
            ])
        }
        ]
    }

    it('A user should be able to create a cmap',
        async () => {
            const res = await request(app)
                .post('/maps')
                .set({ "Authorization": `Bearer ${token}` })
                .send({
                    title: cmap.title,
                    data: cmap.data,
                    assets: cmap.assets
                })
            cmap = res.body.data
            expect(res.status).to.equal(200);
        }
    )
    it('A user should be able to retrieve his maps',
        async () => {
            const res = await request(app)
                .get('/maps')
                .set({ "Authorization": `Bearer ${token}` })
            expect(res.status).to.equal(200);
        }
    )
    it('A user should be able to get a cmap that he created',
        async () => {
            const res = await request(app)
                .get(`/maps/${cmap.id}`)
                .set({ "Authorization": `Bearer ${token}` })
            expect(res.status).to.equal(200);
        }
    )
    it('A user should be able to update a cmap',
        async () => {
            const res = await request(app)
                .patch(`/maps/${cmap.id}`)
                .set({ "Authorization": `Bearer ${token}` })
                .send({
                    "title": "another cmap title"
                })
            expect(res.status).to.equal(200);
        }
    )
    it('A user should be able to delete a cmap',
        async () => {
            const res = await request(app)
                .delete(`/maps/${cmap.id}`)
                .set({ "Authorization": `Bearer ${token}` })
            expect(res.status).to.equal(200);
        }
    )
})