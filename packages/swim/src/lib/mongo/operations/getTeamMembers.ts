import getSwimmersCollection from "../getSwimmersCollection";
import Swimmer from "@/lib/model/Swimmer.interface";

export default async function getTeamMembers(id: string): Promise<Swimmer[]> {
    const collection = await getSwimmersCollection();
    return await collection.find({ teamId: id }).toArray();
}