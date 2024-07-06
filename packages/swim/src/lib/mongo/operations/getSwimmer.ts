import Swimmer from "@/lib/model/Swimmer.interface";
import getSwimmersCollection from "../getSwimmersCollection";
import { ObjectId } from "mongodb";

export default async function getSwimmer(id: string): Promise<Swimmer> {
    const collection = await getSwimmersCollection();
    return (await collection.findOne({ _id: new ObjectId(id) })) as Swimmer;
}