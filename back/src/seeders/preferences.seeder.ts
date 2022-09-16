import { Injectable } from "@nestjs/common";
import { Seeder } from "nestjs-seeder";
import { Preference } from "src/schemas/preference.schema";
import { defaultPreference, defaultPreferences } from "src/utils/constants/preferences.constants";

@Injectable()
export class PreferencesSeeder implements Seeder {
  constructor() { }

  async seed(): Promise<any> {
    try {
      return await Preference.bulkCreate(defaultPreferences);
    } catch (e) {
      console.log(e)
    }
  }

  async drop(): Promise<any> {
    return await Preference.destroy({ where: {} });
  }
}