const env = process.env;

export const BASE_PATH = env.BASE_PATH || "http://localhost:3000";

export const MONGO_USERNAME = env.MONGO_USERNAME || "root";
export const MONGO_PASSWORD = env.MONGO_PASSWORD || "example";
export const MONGO_CONNECTION = env.MONGO_CONNECTION || "mongodb://localhost:27017";

export const MONGO_SWIMMERS_DATABASE = env.MONGO_SWIMMERS_DATABASE || "swimmers";
export const MONGO_SWIMMERS_COLLECTION = env.MONGO_SWIMMERS_COLLECTION || "swimmers";