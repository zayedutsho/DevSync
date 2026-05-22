import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const config = {
  connectionString: process.env.CONNECTION_STRING as string,
  port: process.env.PORT,
  secret: process.env.SECRET_KEY,
  refresh_secret: process.env.REFRESH_SECRET_KEY,
};

export default config;
