import express from "express";
import * as reportsService from "../services/reports";
import { getErrorMessage } from "../utils/error-handler/getErrorMessage";
import { CustomRequest } from "../middleware/authJwt";
import { JwtPayload } from "jsonwebtoken";
import { isAdmin } from "../middleware/isAdmin";

const router = express.Router();

router.get("/", isAdmin, async (req, res) => {
  /**
   * @swagger
   * /reports:
   *   get:
   *     description: Get all reports.
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Reports
   *     responses:
   *       200:
   *         description: Reports found.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   */
  try {
    const response = await reportsService.findAll();
    res
      .status(200)
      .send({ ...response, message: "Reports successfully found" });
  } catch (error) {
    return getErrorMessage(error, res);
  }
});
router.get("/:username", isAdmin, async (req, res) => {
  /**
   * @swagger
   * /reports/{username}:
   *   get:
   *     description: Get a specific report.
   *     tags:
   *       - Reports
   *     parameters:
   *     - in: "path"
   *       name: "username"
   *       schema: { type: "string" }
   *       required: true
   *       description: "username of the report to get"
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Report found.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   */
  try {
    const response = await reportsService.findOne(req.params.username);
    res
      .status(200)
      .send({ ...response, message: "User's reports successfully found" });
  } catch (error) {
    return getErrorMessage(error, res);
  }
});

router.post("/:username", isAdmin, async (req, res) => {
  /**
   * @swagger
   * /reports/{username}:
   *   post:
   *     description: Report a user.
   *     tags:
   *       - Reports
   *     parameters:
   *     - in: "path"
   *       name: "username"
   *       schema: { type: "string" }
   *       required: true
   *       description: "username of the report to get"
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       description: The reason of the report.
   *       required: true
   *       content:
   *         application/json:
   *           schema: { $ref: '#/definitions/sendReportRequest' }
   *     responses:
   *       200:
   *         description: Report created.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   */
  try {
    const response = await reportsService.addReport(
      req.params.username,
      req.body.reason,
      (req as CustomRequest).jwtPayload as JwtPayload
    );
    res
      .status(200)
      .send({ ...response, message: "Report successfully created" });
  } catch (error) {
    return getErrorMessage(error, res);
  }
});

router.delete("/:reports_id", isAdmin, async (req, res) => {
  /**
   * @swagger
   * /reports/{reports_id}:
   *   delete:
   *     description: Delete the report.
   *     tags:
   *       - Reports
   *     parameters:
   *     - in: "path"
   *       name: "reports_id"
   *       schema: { type: "string" }
   *       required: true
   *       description: "reports_id of the report to delete"
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Report deleted.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   */
  try {
    const response = await reportsService.deleteReport(req.params.reports_id);
    res.status(200).send({ ...response });
  } catch (error) {
    return getErrorMessage(error, res);
  }
});

router.patch("/:reports_id", isAdmin, async (req, res) => {
  /**
   * @swagger
   * /reports/{reports_id}:
   *   patch:
   *     description: Modify reason of a report.
   *     tags:
   *       - Reports
   *     parameters:
   *     - in: "path"
   *       name: "reports_id"
   *       schema: { type: "string" }
   *       required: true
   *       description: "reports_id of the report to modify"
   *     - in: "body"
   *       name: report
   *       description: The report to modify.
   *       schema:
   *         type: object
   *         required:
   *           - reason
   *         properties:
   *           reason:
   *             type: string
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Report modified.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   */
  try {
    const response = await reportsService.patchReport(
      req.params.reports_id,
      req.body.reason
    );
    res
      .status(200)
      .send({ ...response, message: "Report successfully modified" });
  } catch (error) {
    return getErrorMessage(error, res);
  }
});

export default router;
