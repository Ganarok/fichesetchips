import app from '../../server';
import { expect } from 'chai';
import {agent as request} from 'supertest';
import 'mocha'
import exp from 'constants';
let token =  ""


describe('Auth', () => {
    describe('Easy test', () => {
        it('Login should return 404 because account do not exist', async () => {
            const res = await request(app)
            .post('/auth/login').send({
                password: '12345678',
                username: "brayan"
            });
            expect(res.status).to.equal(404);
        });
        it('Register should return 200', async () => {
            const res = await request(app)
            .post('/auth/register').send({
                email: "brayan@gmail.com",
                password: '12345678',
                username: "brayan"
            });
            expect(res.status).to.equal(200);
        });
        it('Login should return 200', async () => {
            const res = await request(app)
            .post('/auth/login').send({
                password: '12345678',
                username: "brayan"
            });
            expect(res.status).to.equal(200);
            token = res.body.access_token
            const fs = require('fs')
            fs.writeFile('src/test/.token.txt', token, () => console.error("Error writing file"));  
        });
    });
    describe('Error gestion for register', () => {
        it('Register should return 409 because Query miss email', async () => {
            const res = await request(app)
            .post('/auth/register').send({
                password: '12345678',
                username: "test"
            });
            expect(res.status).to.equal(409);
        });
        it('Register should return 409 because Query miss password', async () => {
            const res = await request(app)
            .post('/auth/register').send({
                email: "test@gmail.com",
                username: "test"
            });
            expect(res.status).to.equal(409);
        });
        it('Register should return 409 because Query miss username', async () => {
            const res = await request(app)
            .post('/auth/register').send({
                email: "test@gmail.com",
                password: '12345678'
            });
            expect(res.status).to.equal(409);
        });
        it('Register should return 400 param not expected', async () => {
            const res = await request(app)
            .post('/auth/register').send({
                email: "test@gmail.com",
                password: '12345678',
                username: "test",
                banane: "param not expected"
            });
            expect(res.status).to.equal(400);
        });
    });
    describe('Error gestion for login', () => {
        it('Login should return 404 because account do not exist', async () => {
            const res = await request(app)
            .post('/auth/login').send({
                password: '12345678',
                username: "test"
            });
            expect(res.status).to.equal(404);
        });
        it('Login should return 404 because password is wrong', async () => {
            const res = await request(app)
            .post('/auth/login').send({
                password: '123456789',
                username: "brayan"
            });
            expect(res.status).to.equal(404);
        });
        it('Login should return 400 because param not expected', async () => {
            const res = await request(app)
            .post('/auth/login').send({
                password: '12345678',
                username: "brayan",
                banane: "param not expected"
            });
            expect(res.status).to.equal(400);
        });
    });
    // describe('Error gestion for logout', () => {
    //     it('Logout should return 401 because token is missing', async () => {
    //         const res = await request(app)
    //         .post('/auth/logout');
    //         expect(res.status).to.equal(401);
    //     });
    //     it('Logout should return 401 because token is invalid', async () => {
    //         const res = await request(app)
    //         .post('/auth/logout').set('Authorization', 'Bearer 123456789');
    //         expect(res.status).to.equal(401);
    //     });
    // });
    describe('Test all parameters', () => {
        it('Register should return 200', async () => {
            const res = await request(app)
            .post('/auth/register').send({
                email: "testhard@gmail",
                password: '12345678',
                username: "testhard"
            });
            expect(res.status).to.equal(200);
            expect(res.body.user).to.have.property('email');
            expect(res.body.user).to.have.property('username');
            expect(res.body.user).to.have.property('id');
            expect(res.body.user).to.have.property('created_at');
            expect(res.body.user).to.have.property('updated_at');
            expect(res.body.user).to.have.property('last_connection');
            expect(res.body.user).to.have.property('avatar');
            expect(res.body).to.have.property('access_token');
            expect(res.body).to.have.property('expires_in');
            expect(res.body).to.have.property('message');
        });
        it('Login should return 200', async () => {
            const res = await request(app)
            .post('/auth/login').send({
                password: '12345678',
                username: "testhard"
            });
            expect(res.status).to.equal(200);
            expect(res.body.user).to.have.property('email');
            expect(res.body.user).to.have.property('username');
            expect(res.body.user).to.have.property('id');
            expect(res.body.user).to.have.property('created_at');
            expect(res.body.user).to.have.property('updated_at');
            expect(res.body.user).to.have.property('last_connection');
            expect(res.body.user).to.have.property('avatar');
            expect(res.body).to.have.property('access_token');
            expect(res.body).to.have.property('expires_in');
            expect(res.body).to.have.property('message');
        });
    });
});
