import { Router } from "express";
import verifyToken from "../../middleware/auth.js";
import { issueController } from "./issues.controller.js";

const router = Router();

router.post(
  "/",
  verifyToken("contributor", "maintainer"),
  issueController.createIssue,
);

export const issueRoute = router;
