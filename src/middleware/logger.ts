import type { NextFunction, Request, Response } from "express";
import fs from "fs";

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log("Method -URL -Time:", req.method, req.url, Date.now());
  const log = `\nMethod=${req.method} | Time=${new Date().toISOString()} | URL=${req.url}\n`;
  fs.appendFile("logger.txt", log, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
    }
  });
  next();
};

export default logger;
