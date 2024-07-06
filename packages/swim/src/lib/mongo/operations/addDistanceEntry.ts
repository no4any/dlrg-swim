import { ObjectId } from "mongodb";
import getSwimmersCollection from "../getSwimmersCollection";
import DistanceEntry from "@/lib/model/DistanceEntry.interface";

export default async function addDistanceEntry(swimmerId: ObjectId, entry: DistanceEntry): Promise<number> {
    const collection = await getSwimmersCollection();
    const result = await collection.updateOne({ _id: swimmerId }, { $push: { distanceEntries: entry } });
    return result.matchedCount;
}