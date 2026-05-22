import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/index.js";
import { pool } from "../db/index.js";
import type { ROLES } from "../types/index.js";

const verifyToken = (...roles: ROLES[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access",
        });
      }

      const decodedToken = jwt.verify(
        token as string,

        config.secret as string,
      ) as jwt.JwtPayload;

      const userData = await pool.query(
        `
        SELECT * FROM users WHERE email=$1`,

        [decodedToken.email],
      );
      const user = userData.rows[0];

      //user check
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      //role check

      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden!! This role has no access!",
        });
      }
      req.user = decodedToken;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  };
};
export default verifyToken;
