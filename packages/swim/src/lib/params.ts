const env = process.env;

export const BASE_PATH = env.BASE_PATH || "http://192.168.178.57:3000";

export const MONGO_USERNAME = env.MONGO_USERNAME || "root";
export const MONGO_PASSWORD = env.MONGO_PASSWORD || "example";
export const MONGO_CONNECTION = env.MONGO_CONNECTION || "mongodb://localhost:27017";

export const MONGO_SWIMMERS_DATABASE = env.MONGO_SWIMMERS_DATABASE || "swimmers";
export const MONGO_SWIMMERS_COLLECTION = env.MONGO_SWIMMERS_COLLECTION || "swimmers";
export const MONGO_DISTANCES_COLLECTION = env.MONGO_DISTANCES_COLLECTION || "distances";
export const MONGO_TEAMS_COLLECTION = env.MONGO_TEAMS_COLLECTION || "teams";
export const MONGO_COUNTERS_COLLECTION = env.MONGO_COUNTERS_COLLECTION || "counters";

export const HASH_SALT = env.HASH_SALT || "salt123";

export const SMTP_HOST = env.SMTP_HOST || "mail.dlrg.de";
export const SMTP_PORT = parseInt(env.SMTP_PORT || "465") || 465;
export const SMTP_SECURE = SMTP_PORT === 465;
export const SMTP_USERNAME = "";
export const SMTP_PASSWORD = "";
export const SMTP_FROM = env.SMTP_FROM || '"DLRG Gießen 24h Schwimmen" <martin.karry@giessen.dlrg.de>';