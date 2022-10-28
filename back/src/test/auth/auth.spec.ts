import app from '../../server';
import { expect } from 'chai';
import {agent as request} from 'supertest';
import 'mocha'

describe('Auth', () => {
    it('Login should not return 200 because account do not exist', async () => {
        const res = await request(app)
        .post('/auth/login').send({
            password: '12345678',
            username: "brayan"
        });
        expect(res.status).not.to.equal(200);
    });
    it('Register should return 200', async () => {
        const res = await request(app)
        .post('/auth/register').send({
            email: "brayan@gmail.com",
            password: '12345678',
            username: "brayan"
        });
        console.log(res.body)
        expect(res.status).to.equal(200);
    });
    it('Login should return 200', async () => {
        const res = await request(app)
        .post('/auth/login').send({
            password: '12345678',
            username: "brayan"
        });
        expect(res.status).to.equal(200);
    });
});