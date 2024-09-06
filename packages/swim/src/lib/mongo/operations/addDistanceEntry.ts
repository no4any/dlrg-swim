import DistanceEntry from "@/lib/model/DistanceEntry.interface";
import getDistancesCollection from "../getDistancesCollection";
import autoIncrement from "./autoIncrement";

export default async function addDistanceEntry(entry: DistanceEntry): Promise<number> {
    const distanceCollection = await getDistancesCollection();
    entry.nr = await autoIncrement("distance");
    distanceCollection.insertOne(entry);
    return entry.nr;
}