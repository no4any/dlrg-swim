import Team from "@/lib/model/Team.interface";
import getDistanceForTeam from "@/lib/mongo/operations/distances/getDistanceForTeam";

export default async function TeamRow({ team }: { team: Team }) {
    const distance = await getDistanceForTeam(team._id?.toString() || "");
    return <div className="grid grid-cols-2">
        <div>{team.name}</div>
        <div>{distance}m ({distance / 50} Bahnen)</div>
    </div>
}