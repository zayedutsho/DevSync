import cors from "cors";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import logger from "./middleware/logger.js";
import { userRoute } from "./modules/user/user.route.js";

const app: Application = express();

//middleware
// app.use(CookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5000",
  }),
);

app.use(logger);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Express server",
    author: "zayed",
  });

  //   res.send("Hello server!");
});

app.use("/api/auth/signup", userRoute);
// app.use("/api/profile", profileRoute);
// app.use("/api/auth", authRoute.router);
// app.use(globalErrorHandler);

export default app;
