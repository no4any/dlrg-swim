"use server"

import flatten from "@/lib/flatten";
import Team from "@/lib/model/Team.interface"
import getDistanceForTeam from "@/lib/mongo/operations/distances/getDistanceForTeam";
import getTeamMembers from "@/lib/mongo/operations/getTeamMembers";
import getTeams from "@/lib/mongo/operations/teams/getTeams"
import "server-only"

export default async function getTeamWithResults(): Promise<(Team & { total: number, average: number, swimmerCount: number })[]> {
    const teams = await getTeams();

    const result = await Promise.all(teams.map(async (team) => {
        const swimmerCount = (await getTeamMembers(team._id?.toString() || "")).filter(member => member.status !== "ANNOUNCED").length;
        const total = await getDistanceForTeam(team._id?.toString() || "");

        return {
            ...team,
            total,
            swimmerCount,
            average: Math.floor(total / swimmerCount)
        }
    }))

    return await flatten(result);
}