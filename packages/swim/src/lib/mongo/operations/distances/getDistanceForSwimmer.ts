import "server-only"
import getDistancesCollection from "../../getDistancesCollection";


export default async function getDistanceForSwimmer(id: string): Promise<number> {
    const collection = await getDistancesCollection();
    const result = await (await collection.find({ swimmerId: id })).toArray();
    return result.reduce((acc, curr) => acc + curr.laps, 0) * 50;
}