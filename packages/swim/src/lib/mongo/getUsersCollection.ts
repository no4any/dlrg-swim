import { Collection } from "mongodb";
import getDatabase from "./getDatabase";
import User from "../model/User.interface";
import { MONGO_USERS_COLLECTION } from "../params";

export default async function getUsersCollection(): Promise<Collection<User>> {
    const usersCollection = (await getDatabase()).collection<User>(MONGO_USERS_COLLECTION);
    usersCollection.createIndex({ mail: 1 }, { unique: true });
    return usersCollection;
}