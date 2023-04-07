import app from '../../server';
import { assert, expect } from 'chai';
import { agent as request } from 'supertest';
import 'mocha'
import { Namespace } from "socket.io"


import { Payload } from '../../utils/types/auth';
import defaultUsers from "../../database/fixtures/users"
import defaultAvatar from "../../database/fixtures/avatar"
import defaultPreferences from "../../database/fixtures/preferences"
import { User } from '../../database/entities/public/User';
import * as jwt from "jsonwebtoken"
import { PrivateProfileWhithoutDate, PublicProfileWhithoutDate } from '../../utils/types/users';


const jwtSecret = process.env.JWTSECRET || "SECRET"
const user = defaultUsers.defaultUser as User
const userPayload: Payload = { username: user.username, id: user.id, email: user.email };
const userToken = jwt.sign(userPayload, jwtSecret)


describe("WebSocket", () => {
    it("should connect", (done) => {
        let io = require('socket.io-client');
        let socket = io('http://localhost:3000/rooms', {
        });
        socket.emit('connection', () => {
            assert(true);
            done();
        });
        socket.disconnect();
        done();
    });
    
    it("should join room", (done) => {
        let io = require('socket.io-client');
        let socket = io('http://localhost:3000/rooms', {
        });
        socket.emit("join", { roomId: 0 }, () => {
            assert(true);
            done();
        })
        socket.emit('leaving_room', { roomId: 0 }, () => {
            assert(false);
            done();
        });
        socket.disconnect();
        done();
    });
    it("Communication between 2 users", (done) => {
        let io = require('socket.io-client');
        let socket = io('http://localhost:3000/rooms', {
        });
        let socket2 = io('http://localhost:3000/rooms', {
        });
        socket.emit("join", { roomId: 0 }, () => {
            assert(true);
            done();
        })
        socket2.emit("join", { roomId: 0 }, () => {
            assert(true);
            done();
        })
        socket.emit("message", { roomId: 0, message: "Hello" }, () => {done()});
        socket2.on("message", { roomId: 0}, (message: String) => {
            console.log("Message received: " + message);
=           assert(true);
            done();
        });
        socket.emit('leaving_room', { roomId: 0 }, () => {
            assert(false);
            done();
        });
        socket2.emit('leaving_room', { roomId: 0 }, () => {
            assert(false);
            done();
        });
        socket.disconnect();
        done();
    });
})