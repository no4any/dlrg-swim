import "server-only"
import getDistancesCollection from "../../getDistancesCollection";
import DistanceEntry from "@/lib/model/DistanceEntry.interface";


export default async function getDistanceForSwimmer(id: string): Promise<DistanceEntry[]> {
    const collection = await getDistancesCollection();
    return (await collection.find({ swimmerId: id })).toArray();
}