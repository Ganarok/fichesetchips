import app from "../../server";
import { expect } from "chai";
import { agent as request } from "supertest";
import "mocha";
let token = "";

import defaultUsers from "../../database/fixtures/users";
import { User } from "../../database/entities/User";
import * as jwt from "jsonwebtoken";
import { Payload } from "../../utils/types/auth";

const jwtSecret = process.env.JWTSECRET || "SECRET";

const user = defaultUsers.defaultUser as User;
const admin = defaultUsers.defaultAdmin as User;

const adminPayload: Payload = {
  username: admin.username,
  id: admin.id,
  email: admin.email,
};
const adminToken = jwt.sign(adminPayload, jwtSecret);

describe("Reports", () => {
  describe("Get all reports", () => {
    it("Should return 200 as admin", async () => {
      const res = await request(app)
        .get("/reports")
        .set({ Authorization: `Bearer ${adminToken}` });
      expect(res.status).to.equal(200);
    });
    it("Should return 401 if not admin", async () => {
      const res = await request(app).get("/reports");
      expect(res.status).to.equal(401);
    });
  });
  describe("Get reports of username", () => {
    it('Should return 200 as admin', async () => {
        const res = await request(app)
        .get('/reports/' + user.username)
        .set({ "Authorization": `Bearer ${adminToken}` });
        expect(res.status).to.equal(200);
    });
    it("Should return 401", async () => {
      const res = await request(app).get("/reports/" + user.username);
      expect(res.status).to.equal(401);
    });
  });
  describe("Post reports of username", () => {
    it("Should return 200 as admin", async () => {
      const res = await request(app)
        .post("/reports/" + user.username)
        .set({ Authorization: `Bearer ${adminToken}` })
        .send({
          reason: "A valid reason to report",
        });
      expect(res.status).to.equal(200);
    });
    it("Should return 401", async () => {
      const res = await request(app).post("/reports/" + user.username);
      expect(res.status).to.equal(401);
    });
  });
  describe("Patch report", () => {
    // it("Should return 200 as admin", async () => {
    //   const reason = "A new reason to report.";
    //   const res = await request(app)
    //     .patch("/reports/edf1dc34-3534-4cd7-85cf-a9488f1279f9")
    //     .set({ Authorization: `Bearer ${adminToken}` })
    //     .send({
    //       reason: reason,
    //     });
    //   expect(res.status).to.equal(200);
    // });
    it("Should return 401", async () => {
      const reason = "A new reason to report.";
      const res = await request(app)
        .patch("/reports/edf1dc34-3534-4cd7-85cf-a9488f1279f9")
        .send({
          reason: reason,
        });
      expect(res.status).to.equal(401);
    });
  });
  describe("Delete report", () => {
    it("Should return 200 as admin", async () => {
      const res = await request(app)
        .delete("/reports/edf1dc34-3534-4cd7-85cf-a9488f1279f9")
        .set({ Authorization: `Bearer ${adminToken}` });
      expect(res.status).to.equal(200);
    });
    it("Should return 401", async () => {
      const res = await request(app).delete(
        "/reports/edf1dc34-3534-4cd7-85cf-a9488f1279f9"
      );
      expect(res.status).to.equal(401);
    });
  });
});