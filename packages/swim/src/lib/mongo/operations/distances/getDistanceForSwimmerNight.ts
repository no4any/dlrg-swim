import "server-only"
import getDistancesCollection from "../../getDistancesCollection";


export default async function getDistanceForSwimmerNight(id: string): Promise<number> {
    const collection = await getDistancesCollection();
    const result = await (await collection.find({ swimmerId: id, nightCup: true })).toArray();
    return result.reduce((acc, curr) => acc + curr.laps, 0) * 50;
}