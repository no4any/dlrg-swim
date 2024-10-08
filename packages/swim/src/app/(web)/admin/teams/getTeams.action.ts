"use server"

import "server-only"

import flatten from "@/lib/flatten";
import Team from "@/lib/model/Team.interface"
import getTeams from "@/lib/mongo/operations/teams/getTeams"

export default async function getTeamsAction(): Promise<Team[]> {
    return await flatten(await getTeams());
}