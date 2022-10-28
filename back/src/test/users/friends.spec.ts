import app from '../../server';
import { expect } from 'chai';
import { agent as request } from 'supertest';
import 'mocha'

import { Payload } from '../../utils/types/auth';
import defaultUsers from "../../database/fixtures/users"
import defaultPreferences from "../../database/fixtures/preferences"
import { User } from '../../database/entities/User';
import * as jwt from "jsonwebtoken"
import { Friend } from '../../database/entities/Friend';
const jwtSecret = process.env.JWTSECRET || "SECRET"
const user = defaultUsers.defaultUser as User
const user1 = defaultUsers.defaultUser1 as User
const user2 = defaultUsers.defaultUser2 as User
const user3 = defaultUsers.defaultUser3 as User
const userPayload: Payload = { username: user.username, id: user.id, email: user.email };
const user1Payload: Payload = { username: user1.username, id: user1.id, email: user1.email };
const user2Payload: Payload = { username: user2.username, id: user2.id, email: user2.email };
const userToken = jwt.sign(userPayload, jwtSecret)
const user1Token = jwt.sign(user1Payload, jwtSecret)
const user2Token = jwt.sign(user2Payload, jwtSecret)

describe('Friends', () => {
    describe('Get friends', () => {
        it('Should return 401 when asking for my friends without a bearer token', async () => {
            const res = await request(app)
                .get('/friends')
            expect(res.status).to.equal(401);
        });
        it('Should return 200 when asking for my friends with a bearer token', async () => {
            const res = await request(app)
                .get('/friends')
                .set({ "Authorization": `Bearer ${userToken}` });
            expect(res.status).to.equal(200);
            res.body.friends.map((friend: Friend) => {
                expect(friend.accepted).to.equal(true);
            })
            expect(res.body).to.have.property('pending_approval');
            res.body.pending_approval.map((friend: Friend) => {
                expect(friend.accepted).to.equal(false);
            })
            expect(res.body).to.have.property('pending_request');
            res.body.pending_request.map((friend: Friend) => {
                expect(friend.accepted).to.equal(false);
            })
        });
        it('Should return 200 and only approuved friends when asking for friends of another user with a bearer token', async () => {
            const res = await request(app)
                .get(`/friends/${user1.username}`)
                .set({ "Authorization": `Bearer ${userToken}` });
            expect(res.status).to.equal(200);
            res.body.friends.map((friend: Friend) => {
                expect(friend.accepted).to.equal(true);
            })
            expect(res.body).to.not.have.property('pending_approval');
            expect(res.body).to.not.have.property('pending_request');
        });
        it('Should return 404 when asking for friends of another user who doesnt exists with a bearer token', async () => {
            const res = await request(app)
                .get(`/friends/user_doesnt_exists`)
                .set({ "Authorization": `Bearer ${userToken}` });
            expect(res.status).to.equal(404);
        });
        it('Should return 200 when asking for my friends that are waiting for my approval', async () => {
            const res = await request(app)
                .get('/friends/pending/approval')
                .set({ "Authorization": `Bearer ${userToken}` });
            expect(res.status).to.equal(200);
            res.body.friends.map((friend: Friend) => {
                expect(friend.accepted).to.equal(false);
            })
        });
        it('Should return 200 when asking for user that I request to be friend and did not accept yet', async () => {
            const res = await request(app)
                .get('/friends/pending/requested')
                .set({ "Authorization": `Bearer ${userToken}` });
            expect(res.status).to.equal(200);
            let check_friends = false
            res.body.friends.map((friend: Friend) => {
                if (friend.user_asked_id == user.id) {
                    expect(friend.accepted).to.equal(false);
                    check_friends = true
                }
            })
            expect(check_friends).to.equal(true);
        });
    })
    describe('Ask friends', () => {
        it('Should return 401 when asking for a friend whithout a bearer token', async () => {
            const res = await request(app)
                .post('/friends')
                .send({ username: user1.username })
            expect(res.status).to.equal(401);
        });
        it('Should return 409 when asking for a friend that I already have', async () => {
            const res = await request(app)
                .post('/friends')
                .set({ "Authorization": `Bearer ${userToken}` })
                .send({ username: user1.username })
            expect(res.status).to.equal(409);
        });
        it('Should return 409 when asking for a friend that I already have', async () => {
            const res = await request(app)
                .post('/friends')
                .set({ "Authorization": `Bearer ${user1Token}` })
                .send({ username: user.username })
            expect(res.status).to.equal(409);
        });
        it('Should return 409 when asking for a friend that I already asked', async () => {
            const res = await request(app)
                .post('/friends')
                .set({ "Authorization": `Bearer ${userToken}` })
                .send({ username: user2.username })
            expect(res.status).to.equal(409);
        });
        it('Should return 409 when asking for a friend that already ask to be my friend', async () => {
            const res = await request(app)
                .post('/friends')
                .set({ "Authorization": `Bearer ${user2Token}` })
                .send({ username: user.username })
            expect(res.status).to.equal(409);
        });
        it('Should return 200 when asking for a user to be a friend', async () => {
            const res = await request(app)
                .post('/friends')
                .set({ "Authorization": `Bearer ${user1Token}` })
                .send({ username: user2.username })
            expect(res.status).to.equal(200);
        });
    })
    describe('Approuve friends', () => {
        it('Should return 401 when approving a friend without a bearer token', async () => {
            const res = await request(app)
                .patch('/friends/user')
                .send({ accepted: true })
            expect(res.status).to.equal(401);
        });
        it('Should return 404 when approving a friend that do not exist', async () => {
            const res = await request(app)
                .patch('/friends/user_who_dont_exist')
                .set({ "Authorization": `Bearer ${userToken}` })
                .send({ accepted: true })
            expect(res.status).to.equal(404);
        });
        it('Should return 404 when approving a friend that never asked you as a friend', async () => {
            const res = await request(app)
                .patch(`/friends/${user2.username}`)
                .set({ "Authorization": `Bearer ${user1Token}` })
                .send({ accepted: true })
            expect(res.status).to.equal(404);
        });
        it('Should return 404 when approving a friend that you already asked', async () => {
            const res = await request(app)
                .patch(`/friends/${user2.username}`)
                .set({ "Authorization": `Bearer ${userToken}` })
                .send({ accepted: true })
            expect(res.status).to.equal(404);
        });
        it('Should return 400 when no parameter', async () => {
            const res = await request(app)
                .patch(`/friends/${user.username}`)
                .set({ "Authorization": `Bearer ${user2Token}` })
            expect(res.status).to.equal(400);
        });
        it('Should return 400 when wrong parameter name', async () => {
            const res = await request(app)
                .patch(`/friends/${user.username}`)
                .set({ "Authorization": `Bearer ${user2Token}` })
                .send({ wrong_param: true })
            expect(res.status).to.equal(400);
        });
        it('Should return 400 when wrong parameter', async () => {
            const res = await request(app)
                .patch(`/friends/${user.username}`)
                .set({ "Authorization": `Bearer ${user2Token}` })
                .send({ accepted: "wrong_param" })
            expect(res.status).to.equal(400);
        });
        it('Should return 400 when not expected parameter', async () => {
            const res = await request(app)
                .patch(`/friends/${user.username}`)
                .set({ "Authorization": `Bearer ${user2Token}` })
                .send({ accepted: true, wrong_param: "wrong_param" })
            expect(res.status).to.equal(400);
        });
        it('Should return 200 when approving a friend that asked you', async () => {
            const res = await request(app)
                .patch(`/friends/${user1.username}`)
                .set({ "Authorization": `Bearer ${user2Token}` })
                .send({ accepted: true })
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('pending_approval');
            expect(res.body).to.have.property('pending_request');
            let check_friends = false
            res.body.friends.map((friend: Friend) => {
                if (friend.user_asked_id == user1.id && friend.user_answered_id == user2.id) {
                    expect(friend.accepted).to.equal(true);
                    check_friends = true
                }
            })
            expect(check_friends).to.equal(true);
        });
    })
    describe('Delete friends', () => {
        it('Should return 401 when delete a friend without a bearer token', async () => {
            const res = await request(app)
                .delete('/friends/user')
            expect(res.status).to.equal(401);
        });
        it('Should return 404 when delete a friend that is not your friend', async () => {
            const res = await request(app)
                .delete(`/friends/${user3.username}`)
                .set({ "Authorization": `Bearer ${userToken}` })
            expect(res.status).to.equal(404);
        });
        it('Should return 200 when delete a friend that was your accepted friend', async () => {
            const res = await request(app)
                .delete(`/friends/${user1.username}`)
                .set({ "Authorization": `Bearer ${user2Token}` })
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('pending_approval');
            expect(res.body).to.have.property('pending_request');
            res.body.friends.map((friend: Friend) => {
                expect(Object.values(friend).includes(user1.id)).to.equal(false)
            })
            res.body.pending_approval.map((friend: Friend) => {
                expect(Object.values(friend).includes(user1.id)).to.equal(false)
            })
            res.body.pending_request.map((friend: Friend) => {
                expect(Object.values(friend).includes(user1.id)).to.equal(false)
            })
        });
        it('Should return 200 when delete a friend that was your pending friend', async () => {
            const res = await request(app)
                .delete(`/friends/${user2.username}`)
                .set({ "Authorization": `Bearer ${userToken}` })
            expect(res.status).to.equal(200);
            res.body.friends.map((friend: Friend) => {
                expect(Object.values(friend).includes(user2.id)).to.equal(false)
            })
            res.body.pending_approval.map((friend: Friend) => {
                expect(Object.values(friend).includes(user2.id)).to.equal(false)
            })
            res.body.pending_request.map((friend: Friend) => {
                expect(Object.values(friend).includes(user2.id)).to.equal(false)
            })
            await request(app)
                .post('/friends')
                .set({ "Authorization": `Bearer ${userToken}` })
                .send({ username: user2.username })
        });
    })
});
