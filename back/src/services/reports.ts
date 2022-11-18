import { AppDataSource } from "../database/data-source";
import { Reports } from "../database/entities/Reports";
import { User } from "../database/entities/User";
import { JwtPayload } from "jsonwebtoken";


const ReportsRepository = AppDataSource.getRepository(Reports);
const UserRepository = AppDataSource.getRepository(User)

export async function findAll() {
  const reports = await ReportsRepository.find();
  return { reports: reports };
}

export async function findOne(id: string) {
  const reports = await ReportsRepository.find({ where: { id: id } });
  return { reports: reports };
}

export async function addReport(id: string, reason: string, payload: JwtPayload) {
  const user = await UserRepository.findOneByOrFail({ username: payload.username })  
  const reports = ReportsRepository.create({
    reported: id,
    by: user.id,
    reason: reason,
  });
  ReportsRepository.save(reports);
  return { reports: reports };
}

export async function deleteReport(id: string) {
  const reports = await ReportsRepository.delete({ id: id });
  return { reports: reports };
}

export async function patchReport(id: string, reason: string) {
    const report = await ReportsRepository.findOneOrFail({ where: { id: id } });
    if(report != undefined) {
        report.reason = reason;
        ReportsRepository.save(report);
    }
    return { report: report };
  }