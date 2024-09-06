import DistanceEntry from "@/lib/model/DistanceEntry.interface";
import getDistancesCollection from "../getDistancesCollection";

export default async function getDistances(id: string):Promise<DistanceEntry[]> {
    const collection = await getDistancesCollection();
    return await collection.find({swimmerId: id}).toArray();
}