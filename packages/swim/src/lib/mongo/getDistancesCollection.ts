import { Collection } from "mongodb";
import getDatabase from "./getDatabase";
import { MONGO_DISTANCES_COLLECTION } from "../params";
import DistanceEntry from "../model/DistanceEntry.interface";

export default async function getDistancesCollection(): Promise<Collection<DistanceEntry>> {
    return (await getDatabase()).collection<DistanceEntry>(MONGO_DISTANCES_COLLECTION);
}