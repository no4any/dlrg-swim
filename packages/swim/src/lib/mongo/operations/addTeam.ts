import Team from "@/lib/model/Team.interface";
import getTeamsCollection from "../getTeamsCollection";

export default async function addTeam(team: Team): Promise<string> {
    const collection = await getTeamsCollection();
    const result = await collection.insertOne(team);
    return result.insertedId.toString();
}