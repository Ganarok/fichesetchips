import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { Preference, PreferenceDocument } from "src/schemas/preference.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { fixtures } from "./fixtures";


@Injectable()
export class PreferenceSeeder {
    constructor(@InjectModel(Preference.name) private preferenceModel: Model<PreferenceDocument>) { }

    @Command({ command: 'seed:preferences', describe: 'create default preferences' })
    async create() {
        try {
            await this.preferenceModel.insertMany(fixtures.preferences)
        } catch (e) {
            console.log(e)
        }
    }

    @Command({ command: 'drop:preferences', describe: 'delete all created preferences' })
    async drop(): Promise<void> {
        await this.preferenceModel.deleteMany({})
    }
}