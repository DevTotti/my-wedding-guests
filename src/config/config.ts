import { config } from "dotenv";

if (process.env.NODE_ENV !== "production") {
  config();
}
const Config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  CLIENT_URL: process.env.CLIENT_URL,
  SALT_ROUND: process.env.SALT_ROUND,
  bouncerId: process.env.CUSTOMER_CLIENT_ID,
  clientId: process.env.APP_CLIENT_ID,
  adminUserName: process.env.APP_CLIENT_NAME,
};

export { Config };
