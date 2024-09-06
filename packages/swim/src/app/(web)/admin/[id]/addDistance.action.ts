"use server"

import DistanceEntry from "@/lib/model/DistanceEntry.interface";
import addDistanceEntry from "@/lib/mongo/operations/addDistanceEntry";

export default async function addDistance(distanceEntry: DistanceEntry): Promise<number> {
    return await addDistanceEntry(distanceEntry);
}