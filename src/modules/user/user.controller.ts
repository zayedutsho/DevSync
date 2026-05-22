import type { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse.js";
import { userService } from "./user.service.js";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUserIntoDb(req.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User Created successfully!",
      data: result.rows[0],
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

export const userController = {
  createUser,
};
