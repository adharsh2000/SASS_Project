import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";

const app: Application = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use((req, res, next) => {
  try {
    
  } catch (error) {
    console.log(error);
  }
})

app.get("/api/onboarding", (req: any, res: Response, next: NextFunction) => {
  let tenant = req.headers["x-tenant"];
  console.log("tennat from onboarding service", tenant);
  console.log('tenant info from onboarding service', req.tenantInfo);
  
  res.status(200).json({ message: "onboarding Service is running this is from auth service and we can confirm it! yaay" });
});

app.listen(4001, () => {
  console.log(`onboarding Service running on port 4001`);
});
