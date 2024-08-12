import { ObjectId } from "mongodb";
import getSwimmersCollection from "../getSwimmersCollection";

export default async function deleteSwimmer(id: string): Promise<number> {
    const collection = await getSwimmersCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount;
}