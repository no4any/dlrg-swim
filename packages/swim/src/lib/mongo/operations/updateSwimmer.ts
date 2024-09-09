import Swimmer from "@/lib/model/Swimmer.interface";
import getSwimmersCollection from "../getSwimmersCollection";
import { ObjectId } from "mongodb";

export default async function updateSwimmer(id: string, swimmer: Swimmer): Promise<number> {
    const collection = await getSwimmersCollection();
    const result = await collection.updateOne({ _id: new ObjectId(id) }, {
        $set: {
            status: "REGISTERED",
            capColor: swimmer.capColor,
            capNr: swimmer.capNr,
            regNr: swimmer.regNr
        }
    });
    return result.matchedCount;
}