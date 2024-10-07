"use client"

import { useState } from "react";
import Team from "@/lib/model/Team.interface";
import getTeamsAction from "./getTeams.action";
import Link from "next/link";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default function TeamsTable({ teams }: { teams: Team[] }) {
    const [localTeams, setLocalTeams] = useState<Team[]>(teams);

    async function reload() {
        setLocalTeams(await getTeamsAction())
    }

    return <div>
        {localTeams.map((team) => <TeamLine key={team._id?.toString() || ""} team={team} />)}
    </div>
}

function TeamLine({ team }: { team: Team }) {
    return <div className="grid grid-cols-2">
        <div className="p-1">{team.name}</div>
        <div className="text-right"><Link className="rounded-lg bg-dlrg-red-500 p-1" href={`/admin/teams/${team._id?.toString() || ""}`}>Zum Team</Link></div>
    </div>
}