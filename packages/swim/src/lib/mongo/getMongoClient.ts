import { MongoClient } from "mongodb";
import { MONGO_CONNECTION, MONGO_PASSWORD, MONGO_USERNAME,  } from "../params";

const mongo: MongoClient | undefined = undefined;

export default async function getMongoClient(): Promise<MongoClient> {
    if (mongo) {
        return mongo;
    }
    console.log(`Connection to ${MONGO_CONNECTION}`)
    return new MongoClient(MONGO_CONNECTION, {
        auth: {
            username: MONGO_USERNAME,
            password: MONGO_PASSWORD
        }
    })
}