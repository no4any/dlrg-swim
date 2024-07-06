import { MONGO_SWIMMERS_DATABASE } from "../params";
import getMongoClient from "./getMongoClient";

export default async function getDatabase() {
    return (await getMongoClient()).db(MONGO_SWIMMERS_DATABASE)
}