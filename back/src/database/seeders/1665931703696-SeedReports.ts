import { MigrationInterface, QueryRunner } from "typeorm";
import { AppDataSource } from "../data-source";
import { Reports } from "../entities/Reports";
import { User } from "../entities/User";

import defaultUsers from "../fixtures/users";

export class SeedReports1665931703696 implements MigrationInterface {
  name = "SeedReports1665931703696";

  public async up(_: QueryRunner): Promise<any> {
    const ReportRepository = AppDataSource.getRepository(Reports);

    const user = defaultUsers.defaultUser as User;
    const admin = defaultUsers.defaultAdmin as User;

    const report: Reports = {
      id: "edf1dc34-3534-4cd7-85cf-a9488f1279f9",
      reported: user.id,
      by: admin.id,
      reason: "A real reason to report",
      user_reported: user,
      user_who_reports: admin,
      created_at: "2022-06-24T11:29:59.619Z",
      updated_at: "2022-06-24T11:29:59.619Z",
    };

    await ReportRepository.save([report]);
  }

  public async down(_: QueryRunner): Promise<any> {
    const ReportRepository = AppDataSource.getRepository(Reports);
    await ReportRepository.delete({});
  }
}
