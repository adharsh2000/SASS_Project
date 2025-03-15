import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "./config/config";
import proxy from "express-http-proxy";

const app: Application = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

const proxyOptions = {
  proxyReqPathResolver: (req: Request) => {
    return req.originalUrl.replace(/^\/v1/, "/api");
  },
  proxyErrorHandler: (err: any, res: Response, next: NextFunction) => {
    res.status(500).json({
      message: `Internal server error`,
      error: err.message,
    });
  },
};

app.use(
  "/v1/auth",
  proxy("http://localhost:4001", {
    ...proxyOptions,
    proxyReqBodyDecorator: (proxyReqOpts, srcReq) => {
    //   proxyReqOpts.headers["Content-Type"] = "application/json";
      return proxyReqOpts;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      console.log(
        `Response received from Identity service: ${proxyRes.statusCode}`
      );

      return proxyResData;
    },
  })
);

app.listen(config.PORT, () => {
  console.log(`API Gateway running on port ${config.PORT}`);
  console.log(`Auth Service running on port 4001`);
});
