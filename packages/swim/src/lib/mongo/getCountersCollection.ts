import { Collection } from "mongodb";
import getDatabase from "./getDatabase";
import { MONGO_COUNTERS_COLLECTION } from "../params";

export default async function getCountersCollection(): Promise<Collection<any>> {
    return (await getDatabase()).collection<any>(MONGO_COUNTERS_COLLECTION);
}