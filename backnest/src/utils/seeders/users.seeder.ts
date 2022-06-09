import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { Preference, PreferenceDocument } from "src/schemas/preference.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { fixtures } from "./fixtures";
import { User, UserDocument } from 'src/schemas/user.schema';


@Injectable()
export class UserSeeder {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    @Command({ command: 'seed:users', describe: 'create default users' })
    async create() {
        try {
            await this.userModel.insertMany(fixtures.users)
        } catch (e) {
            console.log(e)
        }
    }

    @Command({ command: 'drop:users', describe: 'delete all created users' })
    async drop(): Promise<void> {
        await this.userModel.deleteMany({})
    }
}