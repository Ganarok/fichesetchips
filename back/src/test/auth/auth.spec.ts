import app from '../../server';
import { expect } from 'chai';
import {agent as request} from 'supertest';
import 'mocha'
let token =  ""

import defaultUsers from "../../database/fixtures/users"
import { User } from '../../database/entities/User';

const user = defaultUsers.defaultUser as User

describe('Auth', () => {
    describe('Easy test', () => {
        it('Login should return 404 because account do not exist', async () => {
            const res = await request(app)
            .post('/auth/login').send({
                password: "password",
                username: "account_doesnt_exist"
            });
            expect(res.status).to.equal(404);
        });
        it('Register should return 200', async () => {
            const res = await request(app)
            .post('/auth/register').send({
                email: Math.random().toString(36).split(".")[1],
                password: "password",
                username: Math.random().toString(36).split(".")[1]
            });
            expect(res.status).to.equal(200);
        });
        it('Login should return 200', async () => {
            const res = await request(app)
            .post('/auth/login').send({
                password: "password",
                username: user.username
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
                password: "password",
                username: Math.random().toString(36).split(".")[1]
            });
            expect(res.status).to.equal(409);
        });
        it('Register should return 409 because Query miss password', async () => {
            const res = await request(app)
            .post('/auth/register').send({
                email: Math.random().toString(36).split(".")[1],
                username: Math.random().toString(36).split(".")[1]
            });
            expect(res.status).to.equal(409);
        });
        it('Register should return 409 because Query miss username', async () => {
            const res = await request(app)
            .post('/auth/register').send({
                email: Math.random().toString(36).split(".")[1],
                password: "password"
            });
            expect(res.status).to.equal(409);
        });
        it('Register should return 400 param not expected', async () => {
            const res = await request(app)
            .post('/auth/register').send({
                email: Math.random().toString(36).split(".")[1],
                password: "password",
                username: Math.random().toString(36).split(".")[1],
                banane: "param not expected"
            });
            expect(res.status).to.equal(400);
        });
    });
    describe('Error handler for login', () => {
        it('Login should return 404 because account do not exist', async () => {
            const res = await request(app)
            .post('/auth/login').send({
                password: "password",
                username: "account_doesnt_exist"
            });
            expect(res.status).to.equal(404);
        });
        it('Login should return 404 because password is wrong', async () => {
            const res = await request(app)
            .post('/auth/login').send({
                password: "wrong_password",
                username: user.username
            });
            expect(res.status).to.equal(404);
        });
        it('Login should return 400 because param not expected', async () => {
            const res = await request(app)
            .post('/auth/login').send({
                password: "password",
                username: user.username,
                banane: "param not expected"
            });
            expect(res.status).to.equal(400);
        });
    });
    describe('Test all parameters', () => {
        it('Register should return 200', async () => {
            const res = await request(app)
            .post('/auth/register').send({
                email: Math.random().toString(36).split(".")[1],
                password: "password",
                username: Math.random().toString(36).split(".")[1]
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
                password: "password",
                username: user.username
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
