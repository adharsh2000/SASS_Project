import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "./config/config";
import proxy from "express-http-proxy";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import fetchTenantDBURI from "./middlewares/tenantDb.middleware";

const app: Application = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

//TODO: need to do the rate limiting here

const proxyOptions = {
  proxyReqPathResolver: (req: Request) => {
    return req.originalUrl.replace(/^\/v1/, "/api");
  },
  proxyErrorHandler: (err: any, res: Response, next: NextFunction) => {
    res.status(500).json({
      message: err.message || `Internal server error`,
      data: null,
      success: false,
    });
  },
};

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "API Gateway is running this is from api gateway and we can confirm it! yaay" });
});

app.use(
  "/v1/auth",
  fetchTenantDBURI,
  proxy("http://localhost:4001", {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpts, srcReq: any) => {
      // Ensure headers exist before modifying them
      proxyReqOpts.headers = proxyReqOpts.headers || {};

      // proxyReqOpts.headers["Content-Type"] = "application/json";

      // Set the X-Tenant header if tenant exists in srcReq
      if (srcReq?.tenant) {
        proxyReqOpts.headers["x-tenant"] = String(srcReq.tenant);
      }

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

app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`API Gateway running on port ${config.PORT}`);
  console.log(`Auth Service running on port 4001`);
});
