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
    let io: any, socket: any, socket2: any;
    let map = {"height":40,"layers":[{"height":40,"name":"grounds","opacity":1,"type":"tilelayer","visible":true,"width":40,"x":0,"y":0,"data":[29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,0,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29]},{"height":40,"name":"items","opacity":1,"type":"tilelayer","visible":true,"width":40,"x":0,"y":0,"data":[3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,3,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,3,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,3,1,1,1,1,1,1,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}],"orientation":"orthogonal","properties":{},"tileheight":32,"tilesets":[{"firstgid":0,"image":"grounds","imageheight":199,"imagewidth":265,"margin":1,"name":"grounds","properties":{},"spacing":1,"tileheight":32,"tilewidth":32},{"firstgid":1,"image":"items","imageheight":67,"imagewidth":100,"margin":1,"name":"items","properties":{},"spacing":1,"tileheight":32,"tilewidth":32}],"tilewidth":32,"version":1,"width":40};
    let character = {
        "id": "c565b74d-eace-4d66-b995-13d748845427",
      "user_id": "edf1dc34-3534-4cd7-85cf-a9488f1279f9",
      "firstname": "Gabriel",
      "lastname": "LeDragon",
      "sex": "Female",
      "eye_color": "BLUE",
      "hair_color": "BLACK",
      "skin_color": "BROWN",
      "clothing_color_1": "RED",
      "clothing_color_2": "BLACK",
      "bio": "Vive la raclette",
      "alignment": "NEUTRAL GOOD",
      "ideals": "I love cheese",
      "flaws": "I'm used to fart too loud",
      "age": 25,
      "weight": 80,
      "height": 170,
      "hp": 20,
      "race_id": "4d6889bb-bfd7-4934-9625-7c250c7fcafc",
      "class_id": "fcfd78b9-161c-4ac4-9035-7a8189242d24",
      "level_id": 1,
      "experience_points": 0,
      "next_level_experience_points": 300,
      "created_at": "2023-04-13T13:31:16.763Z",
      "updated_at": "2023-04-13T13:31:16.763Z",
      "race": {
        "id": "4d6889bb-bfd7-4934-9625-7c250c7fcafc",
        "name": "HUMAN",
        "french_name": "HUMAIN",
        "size": "MEDIUM",
        "speed": 9,
        "adult_age": 20,
        "max_age": 99,
        "calculation_height": "71d210e6-6be4-4009-b3e0-df91705395c9",
        "calculation_weight": "0d6279bf-ee4c-4f7f-8112-4b54532fcfaf",
        "nb_free_standard_language": 1
      },
      "class": {
        "id": "fcfd78b9-161c-4ac4-9035-7a8189242d24",
        "name": "BARBARIAN",
        "french_name": "BARBARE",
        "hit_dice": 12,
        "light_armor": true,
        "medium_armor": true,
        "heavy_armor": false,
        "shield": true,
        "profile_id": "7816ee90-0e9e-97e1-1836-218460b79b53",
        "money_dice": "361bf64f-e887-e99f-705d-75be9bc2e6a6",
        "skill_nb": 2,
        "profile": {
          "id": "7816ee90-0e9e-97e1-1836-218460b79b53",
          "name": "ALL"
        },
        "saving_throws": [
          {
            "id": "50b45739-7fa1-42be-b724-0ba393d27ecb",
            "name": "STRENGTH"
          },
          {
            "id": "28b7a4ec-71c4-4ac7-a462-27030fca2ecb",
            "name": "CONSTITUTION"
          }
        ]
      },
      "level": {
        "id": 1,
        "experience_points": 0,
        "proficiency_bonus": 2
      },
      "skills": [
        {
          "id": "ff9e11ff-cc57-9e6b-1937-04cae9a988d4",
          "name": "Athletics",
          "characteristic_id": "50b45739-7fa1-42be-b724-0ba393d27ecb",
          "characteristic": {
            "id": "50b45739-7fa1-42be-b724-0ba393d27ecb",
            "name": "STRENGTH"
          }
        },
        {
          "id": "2815d102-15a6-a91c-692f-73c1cf77e191",
          "name": "Perception",
          "characteristic_id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
          "characteristic": {
            "id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
            "name": "WISDOM"
          }
        }
      ],
      "languages": [
        {
          "id": "cbd6d175-1e1e-45bc-af19-af9fcb069188",
          "type": "STANDARD",
          "name": "COMMON"
        },
        {
          "id": "a75bd88f-e499-46ab-bb56-6349294169c0",
          "type": "STANDARD",
          "name": "ELVISH"
        }
      ],
      "character_characteristic": [
        {
          "id": "933b062d-74b3-a889-f744-b8efa2b91b31",
          "character_id": "c565b74d-eace-4d66-b995-13d748845427",
          "characteristic_id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
          "value": 10,
          "characteristic": {
            "id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
            "name": "CHARISMA"
          }
        },
        {
          "id": "d5a254ca-786f-b3ea-c16d-d27c50e6ff66",
          "character_id": "c565b74d-eace-4d66-b995-13d748845427",
          "characteristic_id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
          "value": 8,
          "characteristic": {
            "id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
            "name": "WISDOM"
          }
        },
        {
          "id": "36eb0b5f-8206-64a4-906b-8131f6cd241f",
          "character_id": "c565b74d-eace-4d66-b995-13d748845427",
          "characteristic_id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
          "value": 12,
          "characteristic": {
            "id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
            "name": "INTELLIGENCE"
          }
        },
        {
          "id": "68b06681-9eb7-cc93-cc98-2d5b64c1ab4d",
          "character_id": "c565b74d-eace-4d66-b995-13d748845427",
          "characteristic_id": "28b7a4ec-71c4-4ac7-a462-27030fca2ecb",
          "value": 13,
          "characteristic": {
            "id": "28b7a4ec-71c4-4ac7-a462-27030fca2ecb",
            "name": "CONSTITUTION"
          }
        },
        {
          "id": "78d9d3e3-5d31-8191-7ff6-1b898a9b83cb",
          "character_id": "c565b74d-eace-4d66-b995-13d748845427",
          "characteristic_id": "a1f55d3a-31cc-4363-aa77-e4570baef0db",
          "value": 14,
          "characteristic": {
            "id": "a1f55d3a-31cc-4363-aa77-e4570baef0db",
            "name": "DEXTERITY"
          }
        },
        {
          "id": "f72830cd-7175-e667-faee-f3311c9928a5",
          "character_id": "c565b74d-eace-4d66-b995-13d748845427",
          "characteristic_id": "50b45739-7fa1-42be-b724-0ba393d27ecb",
          "value": 15,
          "characteristic": {
            "id": "50b45739-7fa1-42be-b724-0ba393d27ecb",
            "name": "STRENGTH"
          }
        }
      ],
      "equipment": [
        {
          "id": "aebc22eb-6dfb-0105-7290-5f8f6a519150",
          "item_id": "9ba5db89-cee5-bdb4-4514-2cbef031e5b5",
          "character_id": "c565b74d-eace-4d66-b995-13d748845427",
          "equiped": true,
          "created_at": "2023-04-13T13:31:16.782Z",
          "updated_at": "2023-04-13T13:31:16.782Z",
          "item": {
            "id": "9ba5db89-cee5-bdb4-4514-2cbef031e5b5",
            "french_name": "GOURDIN",
            "name": "CLUB",
            "type": "WEAPON",
            "cost": 1,
            "piece": "sp"
          }
        },
        {
          "id": "45ef99f0-67db-6caa-36c8-4b1424bdc9a0",
          "item_id": "84604dd6-5388-4103-9615-b2bf5f9d2a60",
          "character_id": "c565b74d-eace-4d66-b995-13d748845427",
          "equiped": true,
          "created_at": "2023-04-13T13:31:16.782Z",
          "updated_at": "2023-04-13T13:31:16.782Z",
          "item": {
            "id": "84604dd6-5388-4103-9615-b2bf5f9d2a60",
            "french_name": "BOUCLIER",
            "name": "SHIELD",
            "type": "ARMOR",
            "cost": 10,
            "piece": "gp"
          }
        },
        {
          "id": "0c5deff8-4f1e-4861-a9f0-29372f6a8581",
          "item_id": "ca1093d1-a1d9-4b0a-a556-76d6e92cabfe",
          "character_id": "c565b74d-eace-4d66-b995-13d748845427",
          "equiped": true,
          "created_at": "2023-04-13T13:31:16.782Z",
          "updated_at": "2023-04-13T13:31:16.782Z",
          "item": {
            "id": "ca1093d1-a1d9-4b0a-a556-76d6e92cabfe",
            "french_name": "MOYENNE",
            "name": "MEDIUM",
            "type": "ARMOR",
            "cost": 50,
            "piece": "gp"
          }
        }
      ],
      "money": {
        "id": "25f3a3ad-8437-717b-f6ff-4452fbb7c31a",
        "gold": 50,
        "silver": 0,
        "copper": 0,
        "character_id": "c565b74d-eace-4d66-b995-13d748845427"
      }
    }
    before(function () {
        io = require('socket.io-client');
        socket = io('http://localhost:3000/rooms', {
        });
        socket2 = io('http://localhost:3000/rooms', {
        });
    });

    after(function () {
        socket.disconnect();
    });

    it("should connect", (done) => {
        socket.on("connection", (data: any) => {
            //console.log(data);
            done();
        })
        socket.emit('connection');
    })
    it("should join room", (done) => {
        //console.log("Test connection")
        socket.on("room_joined", (data: any) => {
            //console.log("Room joined" + data);
            assert(true);
            done();
        });
        socket.emit("join", { roomId: 0 }, () => {
            //console.log("Ask to join room");
            assert(true);
        })
    });
    
    it("Communication between 2 users", (done) => {
        socket2.emit('connection');
        socket2.emit("join", { roomId: 0 });
        socket2.on("room_joined", (data: any) => {
            //console.log("Room joined" + data);
            //console.log("Before emit message");
            socket.emit("message", { roomId: 0, message: "Hello" });
        });
        socket2.on("message", (message: any) => {
            //console.log("Client: Message received: " + message);
            assert.equal(message, "Hello");
            socket2.off("message");
            done();
        });
    });
    
    it("should update position of the player 1", (done) => {
        socket.emit("update_character_position", { roomId: 0, player: 2, position: { x: 0, y: 0 } });
        socket2.on("update_character_position", (data: any) => {
            //console.log("1 ---> ", data);
            assert.equal(data.position.x, 0);
            assert.equal(data.position.y, 0);
            done();
        });
    });

    it("should update position of the player 2", (done) => {
        socket2.emit("update_character_position", { roomId: 0, player: 1, position: { x: 5, y: 1 } });
        socket.on("update_character_position", (data: any) => {
            //console.log("2 ---> ", data);
            assert.equal(data.position.x, 5);
            assert.equal(data.position.y, 1);
            done();
        });
    });

    it ("should update the player life", (done) => {
        character["hp"] = 15;
        socket.emit("update_character_life", { roomId: 0, player: 2, firstname: character["firstname"], lastname: character["lastname"], update: character["hp"] });
        socket2.on("message", (data: any) => {
            //console.log("1 ---> ", data);
            assert.equal(data, "Player Gabriel LeDragon has 15 life points left.");
            socket2.off("message");
            done();
        });
    });

    it ("should update the player xp", (done) => {
        character["experience_points"] = 20;
        socket.emit("update_character_xp", { roomId: 0, player: 2, firstname: character["firstname"], lastname: character["lastname"], update: character["experience_points"] });
        socket2.on("message", (data: any) => {
            //console.log("---> ", data);
            assert.equal(data, "Player Gabriel LeDragon has gain 20 xp points.");
            socket2.off("message");
            done();
        });
    });
    
    // it("should update the map", (done) => {
    //     socket.emit("update_map", { roomId: 0, map: map });
    //     socket2.on("update_map", (data: any) => {
    //         //console.log("1 ---> ", data);
    //         assert.equal(data.map, map);
    //         done();
    //     });
    // });

    it("should leave room", (done) => {
        let io = require('socket.io-client');
        let socket = io('http://localhost:3000/rooms', {
        });
        socket.on("leaving_room", (data: any) => {
            //console.log(data)
            done();
        })
        socket.emit('leaving_room', { roomId: 0 }, () => {
            //console.log("Ask to leave room");
            assert(false);
        });
        socket2.emit('leaving_room', { roomId: 0 }, () => {
            assert(false);
        });
        socket2.on("leaving_room", (data: any) => {
            //console.log(data)
            socket2.disconnect();
        })
    });
})