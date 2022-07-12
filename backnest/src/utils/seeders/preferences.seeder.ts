import { Injectable } from "@nestjs/common";
import { Seeder, DataFactory } from "nestjs-seeder";
import { Preference } from "src/schemas/preference.schema";

@Injectable()
export class PreferencesSeeder implements Seeder {
  constructor() { }

  async seed(): Promise<any> {
    try {
      const preference = DataFactory.createForClass(Preference).generate(1);
      return await Preference.create({...preference});
    } catch (e) {
      console.log(e)
    }
  }

  async drop(): Promise<any> {
    return await Preference.destroy({ where: {} });
  }
}