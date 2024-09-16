import { ObjectId } from "mongodb";
import getTeamsCollection from "../getTeamsCollection";
import Team from "@/lib/model/Team.interface";

export default async function getTeam(id: string): Promise<Team | null> {
    const collection = await getTeamsCollection();
    return (await collection.findOne({ _id: new ObjectId(id) }));
}