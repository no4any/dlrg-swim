import { Collection } from "mongodb";
import getDatabase from "./getDatabase";
import { MONGO_COUNTERS_COLLECTION } from "../params";

export default async function getCountersCollection(): Promise<Collection<{ name: string, autoIncrementId: number }>> {
    return (await getDatabase()).collection<{ name: string, autoIncrementId: number }>(MONGO_COUNTERS_COLLECTION);
}