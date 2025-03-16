import { getEnv } from "../utils/get-env";

const appConfig = () => ({
  NODE_ENV: getEnv("NODE_ENV", "development"),
  PORT: getEnv("PORT", "4000"),
  MONGO_URI: getEnv("MONGO_URI"),
  SUPER_ADMIN_DB: getEnv("SUPER_ADMIN_DB"),
  AUTH_SERVICE_URL: getEnv("AUTH_SERVICE_URL", "http://localhost:4001"),
});

export const config = appConfig();
