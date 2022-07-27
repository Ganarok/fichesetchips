import { Injectable } from "@nestjs/common";
import { Seeder, DataFactory } from "nestjs-seeder";
import { User } from "src/schemas/user.schema";
import { users } from "./users.fixtures";

@Injectable()
export class UsersSeeder implements Seeder {
  constructor() { }

  async seed(): Promise<any> {
    try {
      return await User.bulkCreate(users, { individualHooks: true });
    } catch (e) {
      console.log(e)
    }
  }

  async drop(): Promise<any> {
    return await User.destroy({ where: {} });
  }
}