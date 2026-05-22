import type { Request, Response } from "express";
import sendResponse from "../..//utils/sendResponse.js";
import { issuesService } from "./issues.service.js";

const createIssue = async (req: Request, res: Response) => {
  try {
    const reporterId = req.user?.id;

    const result = await issuesService.createIssueIntoDb(req.body, reporterId);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Issue created successfully!",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getAllIssues = async (req: Request, res: Response) => {
  try {
    const result = await issuesService.getAllIssuesFromDb(req.query);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issues retrieved successfully!",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const issueController = {
  createIssue,
  getAllIssues,
};
