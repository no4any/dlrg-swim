import getDistancesCollection from "../../getDistancesCollection";
import getTeam from "../getTeam";
import getTeamMembers from "../getTeamMembers";

export default async function getDistanceForTeam(id: string): Promise<number> {
    const member = await getTeamMembers(id);
    const memberIds = member.map(member => member._id?.toString() || "");

    const col = await getDistancesCollection();
    const result = await col.find({ swimmerId: { $in: memberIds } }).toArray()

    return result.reduce((acc, curr) => acc + curr.laps, 0) * 50;
}