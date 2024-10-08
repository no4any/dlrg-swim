import Team from "@/lib/model/Team.interface";
import getTeamsCollection from "../../getTeamsCollection";

export default async function getTeams(): Promise<Team[]> {
    const collection = await getTeamsCollection();
    return (await collection.find()).toArray();
}