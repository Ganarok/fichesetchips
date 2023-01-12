import app from '../../server';
import { assert, expect } from 'chai';
import { agent as request } from 'supertest';
import 'mocha'

import { Payload } from '../../utils/types/auth';
import defaultUsers from "../../database/fixtures/users"
import defaultAvatar from "../../database/fixtures/avatar"
import defaultPreferences from "../../database/fixtures/preferences"
import { User } from '../../database/entities/public/User';
import * as jwt from "jsonwebtoken"
import { PrivateProfileWhithoutDate, PublicProfileWhithoutDate } from '../../utils/types/users';


const defaultPreference = defaultPreferences.defaultPreference
const darkPreference = defaultPreferences.darkPreference

const jwtSecret = process.env.JWTSECRET || "SECRET"
const user = defaultUsers.defaultUser as User
const admin = defaultUsers.defaultAdmin as User
const superAdmin = defaultUsers.defaultSuperAdmin as User
const userPayload: Payload = { username: user.username, id: user.id, email: user.email };
const adminPayload: Payload = { username: admin.username, id: admin.id, email: admin.email };
const superAdminPayload: Payload = { username: superAdmin.username, id: superAdmin.id, email: superAdmin.email };
const userToken = jwt.sign(userPayload, jwtSecret)
const adminToken = jwt.sign(adminPayload, jwtSecret)
const superAdminToken = jwt.sign(superAdminPayload, jwtSecret)

async function delete_user(token: string) {
    const res = await request(app)
        .delete(`/users`)
        .set({ "Authorization": `Bearer ${token}` })
}

describe('Users', () => {
    describe('User Profile', () => {
        it('Should return 401 when asking for my profile without a bearer token', async () => {
            const res = await request(app)
                .get('/users/profile')
            expect(res.status).to.equal(401);
        });
        it('Should return 200 when asking for my profile with a bearer token', async () => {
            const res = await request(app)
                .get('/users/profile')
                .set({ "Authorization": `Bearer ${userToken}` });
            expect(res.status).to.equal(200);
        });
        it('Should return my private profile when asking for my profile with a bearer token', async () => {
            const res = await request(app)
                .get('/users/profile').set({ "Authorization": `Bearer ${userToken}` });
            assert.deepEqual(new PrivateProfileWhithoutDate(res.body.user), new PrivateProfileWhithoutDate(user))
        });
        it('Sould return the public profile when a user is asking for the profile of another user', async () => {
            const res = await request(app)
                .get('/users/profile/user').set({ "Authorization": `Bearer ${userToken}` });
            expect(res.status).to.equal(200);
            assert.deepEqual(new PublicProfileWhithoutDate(res.body.user), new PublicProfileWhithoutDate(user))
            assert.notDeepEqual(new PrivateProfileWhithoutDate(res.body.user), new PrivateProfileWhithoutDate(user))
            expect(res.status).to.equal(200);
            expect(res.body.user).to.have.property('email');
            expect(res.body.user).to.have.property('username');
            expect(res.body.user).to.not.have.property('id');
            expect(res.body.user).to.not.have.property('role');
            expect(res.body.user).to.not.have.property('preference_id');
            expect(res.body.user).to.not.have.property('password');
            expect(res.body.user).to.have.property('created_at');
            expect(res.body.user).to.have.property('updated_at');
            expect(res.body.user).to.have.property('last_connection');
            expect(res.body.user).to.have.property('avatar');
        });
        it('Sould return the private profile when an admin is asking for the profile of another user', async () => {
            const res = await request(app)
                .get('/users/profile/user').set({ "Authorization": `Bearer ${adminToken}` });
            assert.deepEqual(new PrivateProfileWhithoutDate(res.body.user), new PrivateProfileWhithoutDate(user))
        });
        it('Sould return the private profile when a super admin is asking for the profile of another user', async () => {
            const res = await request(app)
                .get('/users/profile/user').set({ "Authorization": `Bearer ${superAdminToken}` });
            assert.deepEqual(new PrivateProfileWhithoutDate(res.body.user), new PrivateProfileWhithoutDate(user))
        });
        it('Sould return the private profile when a superadmin is asking for the profile of an admin', async () => {
            const res = await request(app)
                .get('/users/profile/admin').set({ "Authorization": `Bearer ${superAdminToken}` });
            expect(res.status).to.equal(200);
        });
        it('Sould return 404 when a user is asking for the profile of a not found user', async () => {
            const res = await request(app)
                .get('/users/profile/userdoesntexists').set({ "Authorization": `Bearer ${userToken}` });
            expect(res.status).to.equal(404);
        });
        it('Sould return 401 when a user is asking for the profile of another admin', async () => {
            const res = await request(app)
                .get('/users/profile/admin').set({ "Authorization": `Bearer ${userToken}` });
            expect(res.status).to.equal(401);
        });
        it('Sould return 401 when a user is asking for the profile of another superadmin', async () => {
            const res = await request(app)
                .get('/users/profile/superadmin').set({ "Authorization": `Bearer ${userToken}` });
            expect(res.status).to.equal(401);
        });
        it('Sould return the public profile when an admin is asking for the profile of another admin', async () => {
            const res = await request(app)
                .get('/users/profile/admin').set({ "Authorization": `Bearer ${adminToken}` });
            expect(res.status).to.equal(200);
            assert.deepEqual(new PublicProfileWhithoutDate(res.body.user), new PublicProfileWhithoutDate(admin))
            assert.notDeepEqual(new PrivateProfileWhithoutDate(res.body.user), new PrivateProfileWhithoutDate(admin))
            expect(res.status).to.equal(200);
            expect(res.body.user).to.have.property('email');
            expect(res.body.user).to.have.property('username');
            expect(res.body.user).to.not.have.property('id');
            expect(res.body.user).to.not.have.property('role');
            expect(res.body.user).to.not.have.property('preference_id');
            expect(res.body.user).to.not.have.property('password');
            expect(res.body.user).to.have.property('created_at');
            expect(res.body.user).to.have.property('updated_at');
            expect(res.body.user).to.have.property('last_connection');
            expect(res.body.user).to.have.property('avatar');
        });
        it('Sould return 401 when an admin is asking for the profile of another superadmin', async () => {
            const res = await request(app)
                .get('/users/profile/superadmin').set({ "Authorization": `Bearer ${adminToken}` });
            expect(res.status).to.equal(401);
        });
    });
    describe('User Patch', () => {
        it('Should return 401 when asking for patch my profile without a bearer token', async () => {
            const res = await request(app)
                .patch('/users')
                .send({
                    "username": "user",
                    "email": "user@email.com",
                    "password": "password",
                    "avatar": "https://cdn-icons-png.flaticon.com/512/147/147142.png",
                    "preference_id": "2cd08d05-c7b3-4550-aa02-aeddf963411c"
                })
            expect(res.status).to.equal(401);
        });
        it('Should return 409 when asking for patch my profile with already used username', async () => {
            const res = await request(app)
                .patch('/users')
                .set({ "Authorization": `Bearer ${userToken}` })
                .send({
                    "username": admin.username
                })
            expect(res.status).to.equal(409);
        });
        it('Should return 409 when asking for patch my profile with already used email', async () => {
            const res = await request(app)
                .patch('/users')
                .set({ "Authorization": `Bearer ${userToken}` })
                .send({
                    "email": admin.email
                })
            expect(res.status).to.equal(409);
        });
        it('Should return 400 when param not expected', async () => {
            const res = await request(app)
                .patch('/users')
                .set({ "Authorization": `Bearer ${userToken}` })
                .send({
                    email: Math.random().toString(36).split(".")[1],
                    username: Math.random().toString(36).split(".")[1],
                    banane: "param not expected"
                });
            expect(res.status).to.equal(400);
        });
        it('Should return 200 and properties updated when asking for patch my properties', async () => {
            const previous_user = {
                email: Math.random().toString(36).split(".")[1],
                password: "previous_password",
                username: Math.random().toString(36).split(".")[1],
                avatar: defaultAvatar,
                preference_id: defaultPreference.id
            }
            const expected_user = {
                email: Math.random().toString(36).split(".")[1],
                password: "post_password",
                username: Math.random().toString(36).split(".")[1],
                avatar: "post_avatar",
                preference_id: darkPreference.id
            } as User
            const register = await request(app)
                .post('/auth/register').send({
                    email: previous_user.email,
                    password: previous_user.password,
                    username: previous_user.username
                });
            const token = register.body.access_token
            const update = await request(app)
                .patch('/users')
                .set({ "Authorization": `Bearer ${token}` })
                .send(expected_user)
            const login = await request(app)
                .post('/auth/login').send({
                    password: expected_user.password,
                    username: expected_user.username
                });
            const res = await request(app)
                .get('/users/profile')
                .set({ "Authorization": `Bearer ${login.body.access_token}` });
            // check that parameters are correctly updated
            expect(res.status).to.equal(200);
            assert.equal(res.body.user.avatar, expected_user.avatar)
            assert.equal(res.body.user.email, expected_user.email)
            assert.equal(res.body.user.username, expected_user.username)
            assert.equal(res.body.user.preference_id, expected_user.preference_id)
            expect(update.status).to.equal(200);
            // check that password and username are correctly updated
            expect(login.status).to.equal(200);
            await delete_user(login.body.access_token)
        });
        it('Should return 200 and properties updated when an admin is asking for patch user properties', async () => {
            const previous_user = {
                email: Math.random().toString(36).split(".")[1],
                password: "previous_password",
                username: Math.random().toString(36).split(".")[1],
                avatar: defaultAvatar,
                preference_id: defaultPreference.id
            }
            const expected_user = {
                email: Math.random().toString(36).split(".")[1],
                password: "post_password",
                username: Math.random().toString(36).split(".")[1],
                avatar: "post_avatar",
                preference_id: darkPreference.id
            } as User
            const register = await request(app)
                .post('/auth/register').send({
                    email: previous_user.email,
                    password: previous_user.password,
                    username: previous_user.username
                });
            const update = await request(app)
                .patch(`/users/${previous_user.username}`)
                .set({ "Authorization": `Bearer ${adminToken}` })
                .send(expected_user)
            const login = await request(app)
                .post('/auth/login').send({
                    password: expected_user.password,
                    username: expected_user.username
                });
            const res = await request(app)
                .get('/users/profile')
                .set({ "Authorization": `Bearer ${login.body.access_token}` });
            // check that parameters are correctly updated
            expect(res.status).to.equal(200);
            assert.equal(res.body.user.avatar, expected_user.avatar)
            assert.equal(res.body.user.email, expected_user.email)
            assert.equal(res.body.user.username, expected_user.username)
            assert.equal(res.body.user.preference_id, expected_user.preference_id)
            expect(update.status).to.equal(200);
            // check that password and username are correctly updated
            expect(login.status).to.equal(200);
            await delete_user(login.body.access_token)
        });
        it('Should return 401 when a not admin is asking for patch user properties', async () => {
            const res = await request(app)
                .patch(`/users/${user.username}`)
                .set({ "Authorization": `Bearer ${userToken}` })
                .send({
                    email: Math.random().toString(36).split(".")[1],
                    password: "password",
                    username: Math.random().toString(36).split(".")[1],
                    avatar: "avatar",
                    preference_id: darkPreference.id
                })
            expect(res.status).to.equal(401);
        });
        it('Should return 401 when a not superadmin is asking for patch admin properties', async () => {
            const res1 = await request(app)
                .patch(`/users/${admin.username}`)
                .set({ "Authorization": `Bearer ${adminToken}` })
                .send({
                    email: Math.random().toString(36).split(".")[1],
                    password: "password",
                    username: Math.random().toString(36).split(".")[1],
                    avatar: "avatar",
                    preference_id: darkPreference.id
                })
            const res2 = await request(app)
                .patch(`/users/${admin.username}`)
                .set({ "Authorization": `Bearer ${userToken}` })
                .send({
                    email: Math.random().toString(36).split(".")[1],
                    password: "password",
                    username: Math.random().toString(36).split(".")[1],
                    avatar: "avatar",
                    preference_id: darkPreference.id
                })
            expect(res1.status).to.equal(401);
            expect(res2.status).to.equal(401);
        });
    })
    describe('User delete profile', () => {
        it('Should return 200 when asking for delete my profile', async () => {
            const user_to_delete = {
                email: Math.random().toString(36).split(".")[1],
                password: "previous_password",
                username: Math.random().toString(36).split(".")[1],
                avatar: defaultAvatar,
                preference_id: defaultPreference.id
            }
            const register = await request(app)
                .post('/auth/register').send({
                    email: user_to_delete.email,
                    password: user_to_delete.password,
                    username: user_to_delete.username
                });
            const token = register.body.access_token
            const res = await request(app)
                .delete('/users')
                .set({ "Authorization": `Bearer ${token}` })
            expect(res.status).to.equal(200);
        });
        it('Should return 200 when an admin is asking for delete the profile of a user', async () => {
            const user_to_delete = {
                email: Math.random().toString(36).split(".")[1],
                password: "previous_password",
                username: Math.random().toString(36).split(".")[1],
                avatar: defaultAvatar,
                preference_id: defaultPreference.id
            }
            const register = await request(app)
                .post('/auth/register').send({
                    email: user_to_delete.email,
                    password: user_to_delete.password,
                    username: user_to_delete.username
                });
            const res = await request(app)
                .delete(`/users/${user_to_delete.username}`)
                .set({ "Authorization": `Bearer ${adminToken}` })
            expect(res.status).to.equal(200);
        });
        it('Should return 200 when a superadmin is asking for delete the profile of a user', async () => {
            const user_to_delete = {
                email: Math.random().toString(36).split(".")[1],
                password: "previous_password",
                username: Math.random().toString(36).split(".")[1],
                avatar: defaultAvatar,
                preference_id: defaultPreference.id
            }
            const register = await request(app)
                .post('/auth/register').send({
                    email: user_to_delete.email,
                    password: user_to_delete.password,
                    username: user_to_delete.username
                });
            const res = await request(app)
                .delete(`/users/${user_to_delete.username}`)
                .set({ "Authorization": `Bearer ${superAdminToken}` })
            expect(res.status).to.equal(200);
        });
        it('Should return 401 when a user is asking for delete the profile of a user', async () => {
            const user_to_delete = {
                email: Math.random().toString(36).split(".")[1],
                password: "previous_password",
                username: Math.random().toString(36).split(".")[1],
                avatar: defaultAvatar,
                preference_id: defaultPreference.id
            }
            const register = await request(app)
                .post('/auth/register').send({
                    email: user_to_delete.email,
                    password: user_to_delete.password,
                    username: user_to_delete.username
                });
            const res = await request(app)
                .delete(`/users/${user_to_delete.username}`)
                .set({ "Authorization": `Bearer ${userToken}` })
            expect(res.status).to.equal(401);
            await delete_user(register.body.access_token)
        });
        it('Should return 401 when an admin or a user is asking for delete the profile of an admin', async () => {
            const res1 = await request(app)
                .delete(`/users/${admin.username}`)
                .set({ "Authorization": `Bearer ${userToken}` })
            const res2 = await request(app)
                .delete(`/users/${admin.username}`)
                .set({ "Authorization": `Bearer ${adminToken}` })
            expect(res1.status).to.equal(401);
            expect(res2.status).to.equal(401);
        });
        it('Should return 404 when an admin is asking for delete the profile of a user that do not exists', async () => {
            const res = await request(app)
                .delete(`/users/user_who_not_exists`)
                .set({ "Authorization": `Bearer ${adminToken}` })
            expect(res.status).to.equal(404);
        });
    })
});
