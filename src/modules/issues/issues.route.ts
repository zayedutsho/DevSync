import { Router } from "express";
import verifyToken from "../../middleware/auth.js";
import { issueController } from "./issues.controller.js";

const router = Router();

router.post(
  "/",
  verifyToken("contributor", "maintainer"),
  issueController.createIssue,
);

router.get("/", issueController.getAllIssues);

router.get("/:id", issueController.getSingleIssue);

router.patch(
  "/:id",
  verifyToken("contributor", "maintainer"),
  issueController.updateIssue,
);

export const issueRoute = router;
