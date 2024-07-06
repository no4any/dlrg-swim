import Swimmer from "@/lib/model/Swimmer.interface";
import getSwimmersCollection from "../getSwimmersCollection";

export default async function getSwimmers(): Promise<Swimmer[]> {
    const collection = await getSwimmersCollection();
    return collection.find({}).toArray();
}