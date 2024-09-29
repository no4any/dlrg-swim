import "server-only"
import getSwimmersCollection from "../../getSwimmersCollection";
import { ObjectId } from "mongodb";

export default async function deleteSwimmer(id: string): Promise<number> {
    const collection = await getSwimmersCollection();
    return (await collection.deleteOne({ _id: new ObjectId(id) })).deletedCount;
}