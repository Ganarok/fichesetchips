import { Injectable } from "@nestjs/common";
import { Seeder, DataFactory } from "nestjs-seeder";
import { User } from "src/schemas/user.schema";

@Injectable()
export class UsersSeeder implements Seeder {
  constructor() { }

  async seed(): Promise<any> {
    try {
      const users = DataFactory.createForClass(User).generate(10);
      return await User.bulkCreate(users, { individualHooks: true });
    } catch (e) {
      console.log(e)
    }
  }

  async drop(): Promise<any> {
    return await User.destroy({ where: {} });
  }
}