import Swimmer from "@/lib/model/Swimmer.interface";
import getSwimmersCollection from "../getSwimmersCollection";

export default async function addSwimmer(swimmer: Swimmer): Promise<string> {
    const collection = await getSwimmersCollection();
    const result = await collection.insertOne(swimmer);
    return result.insertedId.toString();
}