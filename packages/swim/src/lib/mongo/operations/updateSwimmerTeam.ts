import { ObjectId } from "mongodb";
import getSwimmersCollection from "../getSwimmersCollection";

export default async function updateSwimmerTeam(id: string, teamId: string): Promise<number> {
    const collection = await getSwimmersCollection();
    const result = await collection.updateOne({ _id: new ObjectId(id) }, {
        $set: {
            teamId: teamId
        }
    });
    return result.matchedCount;
}