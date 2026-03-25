import { config } from "dotenv";

if (process.env.NODE_ENV !== "production") {
  config();
}
const Config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  CLIENT_URL: process.env.CLIENT_URL,
  LIVE:
    process.env.NODE_ENV === "production" || process.env.NODE_ENV === undefined,
  SALT_ROUND: process.env.SALT_ROUND,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRATION: process.env.ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION: process.env.REFRESH_TOKEN_EXPIRATION,
  GOOGLE_TOKEN_API: process.env.GOOGLE_ACCESS_TOKEN_API,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  APPLE_CLIENT_ID: process.env.APPLE_CLIENT_ID,
  APPLE_TEAM_ID: process.env.APPLE_TEAM_ID,
  APPLE_KEY_ID: process.env.APPLE_KEY_ID,
  APPLE_PRIVATE_KEY: process.env.APPLE_PRIVATE_KEY,
  APPLE_RIDER_CALLBACK_URL: process.env.APPLE_RIDER_CALLBACK_URL,
  APPLE_DRIVER_CALLBACK_URL: process.env.APPLE_DRIVER_CALLBACK_URL,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_RIDER_CALLBACK_URL: process.env.GOOGLE_RIDER_CALLBACK_URL,
  GOOGLE_DRIVER_CALLBACK_URL: process.env.GOOGLE_DRIVER_CALLBACK_URL,
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  OTP_EXPIRES_IN: process.env.OTP_EXPIRES_IN || "30",
  JWT_SECRET: process.env.JWT_SECRET,
  ADMIN_WALLET_ID: process.env.ADMIN_WALLET_ID,
  AGENDA_TRIGGERS: {
    SEND_SINGLE_NOTIFICATION: "SEND_SINGLE_NOTIFICATION",
    SEND_RECURRING_NOTIFICATION: "SEND_RECURRING_NOTIFICATION",
    TRIGGER_FIND_DRIVER: "TRIGGER_FIND_DRIVER",
  },
  EVENTS: {
    SEND_EMAIL: "SEND_EMAIL",
  },
  JOBS: {
    REFERRAL_POINTS: "REFERRAL_POINTS",
    DELETE_USER_ACCOUNT: "DELETE_USER_ACCOUNT",
    SEND_EMAIL: "SEND_EMAIL",
    SEND_APP_NOTIFICATION: "SEND_APP_NOTIFICATION",
    FIND_RIDE_DRIVER: "FIND_RIDE_DRIVER",
    SEND_ADMIN_NOTIFICATION: "SEND_ADMIN_NOTIFICATION",
  },
  ADMIN_ROLE: ["super_admin", "admin"],
  RABBIT_MQ_URL: process.env.RABBIT_MQ_URL,
  PAYMENT_PROVIDER: ["paystack", "blusalt"],
  DEFAULT_BVN: "22222222222",
  USER_TYPE: {
    DRIVER: "driver",
    RIDER: "rider",
  },
  queues: {
    resolvePaystackFunding: "resolvePaystackFunding",
    fundCustomerWalletByAdmin: "fundCustomerWalletByAdmin",
    createCustomerWallet: "createCustomerWallet",
  },
  AUTH_METHOD: {
    NATIVE: "native",
    SOCIAL: "social",
  },
  SOCIAL_CHANNEL: {
    GOOGLE: "google",
    FACEBOOK: "facebook",
    APPLE: "apple",
  },
  VERIFY_ME: {
    baseUrl: process.env.VERIFY_ME_BASE_URL,
    secretKey: process.env.VERIFY_ME_SECRET_KEY,
  },
  BLUSALT: {
    baseUrl: process.env.BLUSALT_BASE_URL,
    secretKey: process.env.BLUSALT_SECRET_KEY,
    publicKey: process.env.BLUSALT_PUBLIC_KEY,
  },
  PAYSTACK: {
    baseUrl: process.env.PAYSTACK_BASE_URL,
    secretKey: process.env.PAYSTACK_SECRET_KEY,
    publicKey: process.env.PAYSTACK_PUBLIC_KEY,
  },
  AI_SERVICE: {
    baseUrl: process.env.AI_SERVICE_BASE_URL,
    secretKey: process.env.AI_SERVICE_SECRET_KEY,
  },
  REDIS_URL: process.env.REDIS_URL,
  RENTAL_CAR_STATUS: {
    BOOKED: "booked",
    ACTIVE: "active",
    INACTIVE: "inactive",
    MAINTENANCE: "maintenance",
  },
  ACTIVE_HIRED_CAR_STATUS: {
    BOOKED: "booked",
    PICKED: "picked",
    RETURNED: "returned",
    CANCELLED: "cancelled",
  },
  SMTP: {
    HOST: process.env.MAIL_HOST,
    USERNAME: process.env.SMTP_USERNAME,
    PASSWORD: process.env.SMTP_PASSWORD,
  },
  RIDE_TYPE: {
    SOLO: "solo",
    SHARED: "shared",
  },
  TRANSACTION_ACTION: {
    DEBIT: "debit",
    CREDIT: "credit",
  },
  SUPPORT_EMAIL: "support@giaride.ng",
  TRANSACTION_TYPE: {
    RIDE_HAILING_STANDARD: "ride_hailing_solo",
    RIDE_HAILING_SHARED: "ride_hailing_shared",
    RIDE_HAILING_ERRAND: "ride_hailing_errand",
    LOGISTIC_XEND: "logistic_xend",
    // LOGISTIC_SMALL: "logistic_small",
    // LOGISTIC_LARGE: "logistic_large",
    // LOGISTIC_FREIGHT: "logistic_freight",
    CAR_RENTAL: "car_rental",
  },
  FEE_TYPE: [
    "ride_hailing_solo",
    "ride_hailing_shared",
    "ride_hailing_errand",
    "logistic_xend",
    // "logistic_small",
    // "logistic_large",
    // "logistic_freight",
    "car_rental",
  ],
  COST_PER_KM: 50,
  COST_PER_MIN: 200,
  DISTANCE_TYPE: ["interstate", "intrastate"],
  DROP_RIDE_TYPE: ["solo", "shared"],
  PAYMENT_TYPE: ["cash", "card", "wallet", "company", "transfer"],
  NATIVE_PAYMENT_TYPE: ["cash", "transfer"],
  OTHER_PAYMENT_TYPE: ["card", "wallet", "company"],
  PAYMENT_METHOD: {
    CASH: "cash",
    WALLET: "wallet",
    COMPANY: "company",
  },
};

export { Config };
