import type { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse.js";
import { authService } from "./auth.service.js";

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUserIntoDb(req.body);
    // const { refreshToken } = result;

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Login successful!",
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
export const authController = {
  loginUser,
};
