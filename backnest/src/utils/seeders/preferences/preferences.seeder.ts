import { Injectable } from "@nestjs/common";
import { Seeder } from "nestjs-seeder";
import { Preference } from "src/schemas/preference.schema";
import { preferences } from "./preferences.fixtures";

@Injectable()
export class PreferencesSeeder implements Seeder {
  constructor() { }

  async seed(): Promise<any> {
    try {
      return await Preference.bulkCreate(preferences);
    } catch (e) {
      console.log(e)
    }
  }

  async drop(): Promise<any> {
    return await Preference.destroy({ where: {} });
  }
}