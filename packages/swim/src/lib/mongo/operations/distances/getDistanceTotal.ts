import "server-only"
import getDistancesCollection from "../../getDistancesCollection";


export default async function getDistanceTotal(): Promise<number> {
    const collection = await getDistancesCollection();
    const result = await (await collection.find({})).toArray();
    return result.reduce((acc, curr) => acc + curr.laps, 0) * 50;
}