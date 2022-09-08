import { Injectable } from "@nestjs/common";
import { Seeder, DataFactory } from "nestjs-seeder";
import { User } from "src/schemas/user.schema";
import { defaultUser, defaultUsers } from "src/utils/constants/users/users.constants";

@Injectable()
export class UsersSeeder implements Seeder {
  constructor() { }

  async seed(): Promise<any> {
    try {
      return await User.bulkCreate(defaultUsers, { individualHooks: true });
    } catch (e) {
      console.log(e)
    }
  }

  async drop(): Promise<any> {
    return await User.destroy({ where: {} });
  }
}