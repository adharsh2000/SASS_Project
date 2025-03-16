import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";

const app: Application = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/api/auth", (req: Request, res: Response, next: NextFunction) => {
  let tenant = req.headers["x-tenant"];
  console.log("tennat from auth service", tenant);
  res.status(200).json({ message: "Auth Service is running this is from auth service and we can confirm it! yaay" });
});

app.listen(4001, () => {
  console.log(`Auth Service running on port 4001`);
});
