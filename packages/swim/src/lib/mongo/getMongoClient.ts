import { MongoClient } from "mongodb";
import { MONGO_CONNECTION, MONGO_PASSWORD, MONGO_USERNAME, } from "../params";

var mongo: MongoClient | undefined;

export default async function getMongoClient(): Promise<MongoClient> {
    if (mongo === undefined) {
        console.log("Creating MongoClient!")
        mongo = new MongoClient(MONGO_CONNECTION, {
            auth: {
                username: MONGO_USERNAME,
                password: MONGO_PASSWORD
            }
        })
    }

    return mongo;
}