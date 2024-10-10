import Swimmer from "@/lib/model/Swimmer.interface";
import getSwimmersCollection from "../getSwimmersCollection";

export default async function getSwimmersForPublishing(): Promise<Swimmer[]> {
    const collection = await getSwimmersCollection();
    return await collection.find({ publishName: true, status: { $in: ["FINISHED", "REGISTERED"] } }).toArray();
}